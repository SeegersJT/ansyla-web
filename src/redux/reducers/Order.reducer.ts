import { ORDER_ACTIONS } from '../actions/Order.action'
import type { OrderItem, OrderState } from '../types/Order.type'

const initialState: OrderState = {
	orderData: [],
	orderDataLoading: false,
	updateOrderStatusLoading: false,
	createOrderLoading: false,
	lastPlacedOrder: null,
	markOrderAsPaidLoading: false,
	myOrderData: [],
	myOrderDataLoading: false,
}

type Action = { type: string; payload?: unknown }

export const OrderReducer = (state = initialState, action: Action): OrderState => {
	switch (action.type) {
		case ORDER_ACTIONS.REQUEST_ORDER_ITEMS_LOADING:
			return { ...state, orderDataLoading: action.payload as boolean }

		case ORDER_ACTIONS.SET_ORDER_ITEMS:
			return { ...state, orderData: action.payload as OrderItem[] }

		case ORDER_ACTIONS.REQUEST_MY_ORDER_ITEMS_LOADING:
			return { ...state, myOrderDataLoading: action.payload as boolean }

		case ORDER_ACTIONS.SET_MY_ORDER_ITEMS:
			return { ...state, myOrderData: action.payload as OrderItem[] }

		case ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS_LOADING:
			return { ...state, updateOrderStatusLoading: action.payload as boolean }

		case ORDER_ACTIONS.REQUEST_MARK_ORDER_AS_PAID_LOADING:
			return { ...state, markOrderAsPaidLoading: action.payload as boolean }

		case ORDER_ACTIONS.REQUEST_CREATE_ORDER_LOADING:
			return { ...state, createOrderLoading: action.payload as boolean }

		case ORDER_ACTIONS.SET_LAST_PLACED_ORDER:
			return { ...state, lastPlacedOrder: action.payload as OrderItem }

		case ORDER_ACTIONS.CLEAR_LAST_PLACED_ORDER:
			return { ...state, lastPlacedOrder: null }

		default:
			return state
	}
}
