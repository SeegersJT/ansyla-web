import { call, put, select, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import { CANCELLED_ORDER_STATUS, type OrderItem, type OrderStatusValue } from '../types/Order.type'
import {
	ORDER_ACTIONS,
	requestCancelOrderLoading,
	requestCreateOrderLoading,
	requestMarkOrderAsPaidLoading,
	requestMyOrderItems,
	requestMyOrderItemsLoading,
	requestOrderItems,
	requestOrderItemsLoading,
	requestUpdateOrderStatusLoading,
	setLastPlacedOrder,
	setMyOrderItems,
	setOrderItems,
	type CancelOrderPayload,
	type CreateOrderPayload,
} from '../actions/Order.action'
import { addSystemNotification } from '../actions/Notification.action'
import { setAuthUserDetails } from '../actions/Authentication.action'
import type { AuthUserDetails } from '../types/Authentication.type'
import type { CartItem } from '../types/Cart.type'
import type { RootState } from '../store'
import type { ProductItem } from '../types/Product.type'
import type { Settings } from '../types/Settings.type'
import { getNextIdentifier } from './Settings.saga'
import { requestAddAddress } from '../actions/Address.action'
import { requestProductItems } from '../actions/Product.action'
import { clearCart } from '../actions/Cart.action'
import { Utils } from '@/utils/Utils'

function* handleOrderItemsRequest() {
	yield put(requestOrderItemsLoading(true))

	try {
		const items: OrderItem[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Orders',
			[]
		)

		yield put(setOrderItems(items))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Order Data'
		yield put(addSystemNotification({ type: 'error', title: 'Orders', message: message }))
	} finally {
		yield put(requestOrderItemsLoading(false))
	}
}

function* handleUpdateOrderStatusRequest(action: {
	type: string
	payload: { id: string; status: string }
}) {
	yield put(requestUpdateOrderStatusLoading(true))

	try {
		yield call([firestoreService, firestoreService.update], 'Orders', action.payload.id, {
			status: action.payload.status,
		})

		yield put(requestOrderItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Orders',
				message: 'Order status updated successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Order Status'
		yield put(addSystemNotification({ type: 'error', title: 'Orders', message: message }))
	} finally {
		yield put(requestUpdateOrderStatusLoading(false))
	}
}

function* handleCreateOrderRequest(action: { type: string; payload: CreateOrderPayload }) {
	yield put(requestCreateOrderLoading(true))

	try {
		const cartData: CartItem[] = yield select((state: RootState) => state.cart.cartData)
		const cartDataSubtotal: number = yield select(
			(state: RootState) => state.cart.cartDataSubtotal
		)
		const productData: ProductItem[] = yield select(
			(state: RootState) => state.product.productData
		)
		const settings: Settings | undefined = yield select(
			(state: RootState) => state.settings.settingsData[0]
		)
		const { couponItem, isCouponApplied } = yield select((state: RootState) => state.coupon)
		const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)
		const userDetails: AuthUserDetails | null = yield select(
			(state: RootState) => state.auth.user?.user_details ?? null
		)
		const myOrders: OrderItem[] = yield select((state: RootState) => state.order.myOrderData)

		if (cartData.length === 0) {
			yield put(
				addSystemNotification({
					type: 'error',
					title: 'Checkout',
					message: 'Your cart is empty',
				})
			)
			return
		}

		const outOfStockItem = cartData.find(cartItem => {
			const product = productData.find(p => p.id === cartItem.product.id)
			return !product || (product.stock ?? 0) < cartItem.quantity
		})

		if (outOfStockItem) {
			yield put(
				addSystemNotification({
					type: 'error',
					title: 'Checkout',
					message: `${outOfStockItem.product.name} no longer has enough stock`,
				})
			)
			return
		}

		const freeShipping = cartDataSubtotal >= (settings?.free_shipping_threshold ?? Infinity)
		const baseShippingCost = settings?.shipping_cost ?? 0
		const shippingCost = freeShipping
			? 0
			: action.payload.deliveryMethod === 'express'
				? baseShippingCost + 100
				: baseShippingCost

		const couponDiscount = isCouponApplied
			? (cartDataSubtotal * couponItem.discount_percentage) / 100
			: 0

		// Defensive re-clamp of points redemption, independent of whatever the UI already capped
		const paidOrders = myOrders.filter(Utils.isPaidOrder)
		const totalSpent = paidOrders.reduce((total, order) => total + order.total, 0)
		const loyalty = Utils.calculateLoyalty(totalSpent, settings)
		const availablePoints = Utils.getAvailablePoints(loyalty, userDetails?.points_redeemed)

		const requestedPoints = Math.max(0, Math.floor(action.payload.pointsToRedeem ?? 0))
		const meetsMinimum = requestedPoints >= (settings?.min_points_redemption ?? 0)
		const maxPointsForSubtotal = settings?.rand_per_point
			? Math.floor(cartDataSubtotal / settings.rand_per_point)
			: 0

		const pointsToRedeem =
			uid && meetsMinimum
				? Math.min(requestedPoints, availablePoints, maxPointsForSubtotal)
				: 0

		const pointsDiscount = Utils.calculatePointsDiscount(pointsToRedeem, settings)
		const discount = couponDiscount + pointsDiscount

		const total = Math.max(0, cartDataSubtotal - discount) + shippingCost

		const { identifier }: { identifier: string; sequence: number } = yield call(
			getNextIdentifier,
			'order_no',
			'order_prefix'
		)

		const firstStatus: OrderStatusValue =
			[...(settings?.statuses ?? [])].sort(
				(a, b) => (a.status_no ?? 0) - (b.status_no ?? 0)
			)[0]?.status ?? 'Processing'

		const isManualEft = action.payload.paymentMethod === 'Manual EFT'

		const orderPayload = {
			order_no: identifier,
			customer_id: uid ?? null,
			customer_name: action.payload.customerName,
			customer_email: action.payload.customerEmail,
			items: cartData.map(item => ({
				product_id: item.product.id,
				name: item.product.name,
				price: item.product.price,
				quantity: item.quantity,
			})),
			shipping_address: action.payload.shippingAddress,
			delivery_method: action.payload.deliveryMethod,
			payment_method: action.payload.paymentMethod,
			payment_status: isManualEft ? 'Pending Payment' : 'Paid',
			payment_reference: identifier,
			subtotal: cartDataSubtotal,
			shipping_cost: shippingCost,
			discount,
			points_redeemed: pointsToRedeem,
			points_discount: pointsDiscount,
			total,
			status: firstStatus,
			createdBy: uid ?? null,
			updatedBy: uid ?? null,
		}

		const orderId: string = yield call(
			[firestoreService, firestoreService.add],
			'Orders',
			orderPayload
		)

		for (const cartItem of cartData) {
			const product = productData.find(p => p.id === cartItem.product.id)
			if (!product) continue

			yield call([firestoreService, firestoreService.update], 'Products', product.id, {
				stock: Math.max(0, (product.stock ?? 0) - cartItem.quantity),
			})
		}

		if (uid && pointsToRedeem > 0) {
			const updatedPointsRedeemed = (userDetails?.points_redeemed ?? 0) + pointsToRedeem

			yield call([firestoreService, firestoreService.update], 'Users', uid, {
				points_redeemed: updatedPointsRedeemed,
			})

			if (userDetails) {
				yield put(
					setAuthUserDetails({ ...userDetails, points_redeemed: updatedPointsRedeemed })
				)
			}
		}

		if (uid && action.payload.saveAddress) {
			yield put(
				requestAddAddress({
					label: 'Shipping Address',
					full_name: action.payload.shippingAddress.full_name,
					phone_number: action.payload.shippingAddress.phone_number,
					line1: action.payload.shippingAddress.line1,
					city: action.payload.shippingAddress.city,
					province: action.payload.shippingAddress.province,
					postal_code: action.payload.shippingAddress.postal_code,
					is_default: action.payload.setAsDefaultAddress,
					createdBy: null,
					createdAt: null,
					updatedBy: null,
					updatedAt: null,
				})
			)
		}

		yield put(requestProductItems())
		yield put(clearCart())
		yield put(
			setLastPlacedOrder({
				...orderPayload,
				id: orderId,
				createdAt: new Date(),
				updatedAt: new Date(),
			} as OrderItem)
		)
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Checkout',
				message: 'Your ANSYLA order has been placed',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Place Order'
		yield put(addSystemNotification({ type: 'error', title: 'Checkout', message: message }))
	} finally {
		yield put(requestCreateOrderLoading(false))
	}
}

function* handleMyOrderItemsRequest(action: { type: string; payload: string }) {
	yield put(requestMyOrderItemsLoading(true))

	try {
		const orders: OrderItem[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Orders',
			[firestoreService.where('customer_id', '==', action.payload)]
		)

		const sorted = [...orders].sort((a, b) =>
			String(b.createdAt).localeCompare(String(a.createdAt))
		)

		yield put(setMyOrderItems(sorted))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Your Orders'
		yield put(addSystemNotification({ type: 'error', title: 'Orders', message: message }))
	} finally {
		yield put(requestMyOrderItemsLoading(false))
	}
}

function* handleMarkOrderAsPaidRequest(action: { type: string; payload: string }) {
	yield put(requestMarkOrderAsPaidLoading(true))

	try {
		yield call([firestoreService, firestoreService.update], 'Orders', action.payload, {
			payment_status: 'Paid',
		})

		yield put(requestOrderItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Orders',
				message: 'Order marked as paid',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Payment Status'
		yield put(addSystemNotification({ type: 'error', title: 'Orders', message: message }))
	} finally {
		yield put(requestMarkOrderAsPaidLoading(false))
	}
}

function* handleCancelOrderRequest(action: { type: string; payload: CancelOrderPayload }) {
	yield put(requestCancelOrderLoading(true))

	try {
		const { order, actor } = action.payload

		yield call([firestoreService, firestoreService.update], 'Orders', order.id, {
			status: CANCELLED_ORDER_STATUS,
		})

		for (const item of order.items) {
			const product: ProductItem | null = yield call(
				firestoreService.getById<ProductItem>,
				'Products',
				item.product_id
			)
			if (!product) continue

			yield call([firestoreService, firestoreService.update], 'Products', product.id, {
				stock: (product.stock ?? 0) + item.quantity,
			})
		}

		// Refund any points spent on this order, same spirit as restoring stock above
		if (order.customer_id && order.points_redeemed > 0) {
			const customerDetails: AuthUserDetails | null = yield call(
				firestoreService.getById<AuthUserDetails>,
				'Users',
				order.customer_id
			)

			if (customerDetails) {
				const refundedPointsRedeemed = Math.max(
					0,
					(customerDetails.points_redeemed ?? 0) - order.points_redeemed
				)

				yield call(
					[firestoreService, firestoreService.update],
					'Users',
					order.customer_id,
					{ points_redeemed: refundedPointsRedeemed }
				)

				const currentUid: string | undefined = yield select(
					(state: RootState) => state.auth.user?.uid
				)

				if (currentUid === order.customer_id) {
					yield put(
						setAuthUserDetails({
							...customerDetails,
							points_redeemed: refundedPointsRedeemed,
						})
					)
				}
			}
		}

		yield put(requestProductItems())

		if (actor === 'admin') {
			yield put(requestOrderItems())
		} else {
			const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)
			if (uid) yield put(requestMyOrderItems(uid))
		}

		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Orders',
				message: 'Order cancelled successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Cancel Order'
		yield put(addSystemNotification({ type: 'error', title: 'Orders', message: message }))
	} finally {
		yield put(requestCancelOrderLoading(false))
	}
}

export function* orderSaga() {
	yield takeLatest(ORDER_ACTIONS.REQUEST_ORDER_ITEMS, handleOrderItemsRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_MY_ORDER_ITEMS, handleMyOrderItemsRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS, handleUpdateOrderStatusRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_MARK_ORDER_AS_PAID, handleMarkOrderAsPaidRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_CANCEL_ORDER, handleCancelOrderRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_CREATE_ORDER, handleCreateOrderRequest)
}
