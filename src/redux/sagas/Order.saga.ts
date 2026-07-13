import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { OrderItem, OrderStatusValue } from '../types/Order.type'
import {
	ORDER_ACTIONS,
	requestOrderItems,
	requestOrderItemsLoading,
	requestUpdateOrderStatusLoading,
	setOrderItems,
} from '../actions/Order.action'
import { addSystemNotification } from '../actions/Notification.action'

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

export function* orderSaga() {
	yield takeLatest(ORDER_ACTIONS.REQUEST_ORDER_ITEMS, handleOrderItemsRequest)
	yield takeLatest(ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS, handleUpdateOrderStatusRequest)
}
