import { CUSTOMER_ACTIONS } from '../actions/Customer.action'
import type { CustomerItem, CustomerState } from '../types/Customer.type'

const initialState: CustomerState = {
	customerData: [],
	customerDataLoading: false,
}

type Action = { type: string; payload?: unknown }

export const CustomerReducer = (state = initialState, action: Action): CustomerState => {
	switch (action.type) {
		case CUSTOMER_ACTIONS.REQUEST_CUSTOMER_ITEMS_LOADING:
			return {
				...state,
				customerDataLoading: action.payload as boolean,
			}

		case CUSTOMER_ACTIONS.SET_CUSTOMER_ITEMS:
			return {
				...state,
				customerData: action.payload as CustomerItem[],
			}

		default:
			return state
	}
}
