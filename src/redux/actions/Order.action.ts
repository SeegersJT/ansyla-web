import type { OrderItem, OrderShippingAddress } from '../types/Order.type'

export const ORDER_ACTIONS = {
	REQUEST_ORDER_ITEMS: '[ORDER] - ORDER ITEMS - REQUEST',
	REQUEST_ORDER_ITEMS_LOADING: '[ORDER] - ORDER ITEMS - REQUEST - LOADING',
	SET_ORDER_ITEMS: '[ORDER] - ORDER ITEMS - SET',

	REQUEST_MY_ORDER_ITEMS: '[ORDER] - MY ORDER ITEMS - REQUEST',
	REQUEST_MY_ORDER_ITEMS_LOADING: '[ORDER] - MY ORDER ITEMS - REQUEST - LOADING',
	SET_MY_ORDER_ITEMS: '[ORDER] - MY ORDER ITEMS - SET',

	REQUEST_UPDATE_ORDER_STATUS: '[ORDER] - UPDATE ORDER STATUS - REQUEST',
	REQUEST_UPDATE_ORDER_STATUS_LOADING: '[ORDER] - UPDATE ORDER STATUS - REQUEST - LOADING',

	REQUEST_MARK_ORDER_AS_PAID: '[ORDER] - MARK ORDER AS PAID - REQUEST',
	REQUEST_MARK_ORDER_AS_PAID_LOADING: '[ORDER] - MARK ORDER AS PAID - REQUEST - LOADING',

	REQUEST_CREATE_ORDER: '[ORDER] - CREATE ORDER - REQUEST',
	REQUEST_CREATE_ORDER_LOADING: '[ORDER] - CREATE ORDER - REQUEST - LOADING',
	SET_LAST_PLACED_ORDER: '[ORDER] - LAST PLACED ORDER - SET',
	CLEAR_LAST_PLACED_ORDER: '[ORDER] - LAST PLACED ORDER - CLEAR',

	REQUEST_CANCEL_ORDER: '[ORDER] - CANCEL ORDER - REQUEST',
	REQUEST_CANCEL_ORDER_LOADING: '[ORDER] - CANCEL ORDER - REQUEST - LOADING',
} as const

export const requestOrderItems = () => ({
	type: ORDER_ACTIONS.REQUEST_ORDER_ITEMS,
})

export const requestOrderItemsLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_ORDER_ITEMS_LOADING,
	payload: loading,
})

export const setOrderItems = (payload: OrderItem[]) => ({
	type: ORDER_ACTIONS.SET_ORDER_ITEMS,
	payload,
})

export const requestUpdateOrderStatus = (id: string, status: string) => ({
	type: ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS,
	payload: { id, status },
})

export const requestUpdateOrderStatusLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS_LOADING,
	payload: loading,
})

export interface CreateOrderPayload {
	customerName: string
	customerEmail: string
	shippingAddress: OrderShippingAddress
	deliveryMethod: 'standard' | 'express'
	paymentMethod: string
	saveAddress: boolean
	setAsDefaultAddress: boolean
}

export const requestCreateOrder = (payload: CreateOrderPayload) => ({
	type: ORDER_ACTIONS.REQUEST_CREATE_ORDER,
	payload,
})

export const requestCreateOrderLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_CREATE_ORDER_LOADING,
	payload: loading,
})

export const setLastPlacedOrder = (order: OrderItem) => ({
	type: ORDER_ACTIONS.SET_LAST_PLACED_ORDER,
	payload: order,
})

export const clearLastPlacedOrder = () => ({
	type: ORDER_ACTIONS.CLEAR_LAST_PLACED_ORDER,
})

export const requestMyOrderItems = (uid: string) => ({
	type: ORDER_ACTIONS.REQUEST_MY_ORDER_ITEMS,
	payload: uid,
})

export const requestMyOrderItemsLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_MY_ORDER_ITEMS_LOADING,
	payload: loading,
})

export const setMyOrderItems = (payload: OrderItem[]) => ({
	type: ORDER_ACTIONS.SET_MY_ORDER_ITEMS,
	payload,
})

export const requestMarkOrderAsPaid = (id: string) => ({
	type: ORDER_ACTIONS.REQUEST_MARK_ORDER_AS_PAID,
	payload: id,
})

export const requestMarkOrderAsPaidLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_MARK_ORDER_AS_PAID_LOADING,
	payload: loading,
})

export interface CancelOrderPayload {
	order: OrderItem
	actor: 'admin' | 'customer'
}

export const requestCancelOrder = (payload: CancelOrderPayload) => ({
	type: ORDER_ACTIONS.REQUEST_CANCEL_ORDER,
	payload,
})

export const requestCancelOrderLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_CANCEL_ORDER_LOADING,
	payload: loading,
})
