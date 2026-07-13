import type { OrderStatusValue } from '../types/Order.type'

export const ORDER_ACTIONS = {
	REQUEST_ORDER_ITEMS: '[ORDER] - ORDER ITEMS - REQUEST',
	REQUEST_ORDER_ITEMS_LOADING: '[ORDER] - ORDER ITEMS - REQUEST - LOADING',
	SET_ORDER_ITEMS: '[ORDER] - ORDER ITEMS - SET',

	REQUEST_UPDATE_ORDER_STATUS: '[ORDER] - UPDATE ORDER STATUS - REQUEST',
	REQUEST_UPDATE_ORDER_STATUS_LOADING: '[ORDER] - UPDATE ORDER STATUS - REQUEST - LOADING',
} as const

export const requestOrderItems = () => ({
	type: ORDER_ACTIONS.REQUEST_ORDER_ITEMS,
})

export const requestOrderItemsLoading = (loading: boolean) => ({
	type: ORDER_ACTIONS.REQUEST_ORDER_ITEMS_LOADING,
	payload: loading,
})

export const setOrderItems = (payload: import('../types/Order.type').OrderItem[]) => ({
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
