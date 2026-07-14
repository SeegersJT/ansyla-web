import { ADDRESS_ACTIONS } from '../actions/Address.action'
import type { AddressItem, AddressState } from '../types/Address.type'

const initialState: AddressState = {
	addressData: [],
	addressDataLoading: false,
	addAddressLoading: false,
	updateAddressLoading: false,
	removeAddressLoading: false,
}

type Action = { type: string; payload?: unknown }

export const AddressReducer = (state = initialState, action: Action): AddressState => {
	switch (action.type) {
		case ADDRESS_ACTIONS.REQUEST_ADDRESS_ITEMS_LOADING:
			return { ...state, addressDataLoading: action.payload as boolean }

		case ADDRESS_ACTIONS.SET_ADDRESS_ITEMS:
			return { ...state, addressData: action.payload as AddressItem[] }

		case ADDRESS_ACTIONS.CLEAR_ADDRESS_ITEMS:
			return initialState

		case ADDRESS_ACTIONS.REQUEST_ADD_ADDRESS_LOADING:
			return { ...state, addAddressLoading: action.payload as boolean }

		case ADDRESS_ACTIONS.REQUEST_UPDATE_ADDRESS_LOADING:
			return { ...state, updateAddressLoading: action.payload as boolean }

		case ADDRESS_ACTIONS.REQUEST_REMOVE_ADDRESS_LOADING:
			return { ...state, removeAddressLoading: action.payload as boolean }

		default:
			return state
	}
}
