import { ORDER_ACTIONS } from '../actions/Order.action'
import type { OrderItem, OrderState } from '../types/Order.type'

const initialState: OrderState = {
	orderData: [],
	orderDataLoading: false,
	updateOrderStatusLoading: false,
}

type Action = { type: string; payload?: unknown }

export const OrderReducer = (state = initialState, action: Action): OrderState => {
	switch (action.type) {
		case ORDER_ACTIONS.REQUEST_ORDER_ITEMS_LOADING:
			return {
				...state,
				orderDataLoading: action.payload as boolean,
			}

		case ORDER_ACTIONS.SET_ORDER_ITEMS:
			return {
				...state,
				orderData: action.payload as OrderItem[],
			}

		case ORDER_ACTIONS.REQUEST_UPDATE_ORDER_STATUS_LOADING:
			return {
				...state,
				updateOrderStatusLoading: action.payload as boolean,
			}

		default:
			return state
	}
}
