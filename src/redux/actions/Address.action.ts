import type { AddressItem } from '../types/Address.type'

export const ADDRESS_ACTIONS = {
	REQUEST_ADDRESS_ITEMS: '[ADDRESS] - ADDRESS ITEMS - REQUEST',
	REQUEST_ADDRESS_ITEMS_LOADING: '[ADDRESS] - ADDRESS ITEMS - REQUEST - LOADING',
	SET_ADDRESS_ITEMS: '[ADDRESS] - ADDRESS ITEMS - SET',
	CLEAR_ADDRESS_ITEMS: '[ADDRESS] - ADDRESS ITEMS - CLEAR',

	REQUEST_ADD_ADDRESS: '[ADDRESS] - ADD ADDRESS - REQUEST',
	REQUEST_ADD_ADDRESS_LOADING: '[ADDRESS] - ADD ADDRESS - REQUEST - LOADING',

	REQUEST_UPDATE_ADDRESS: '[ADDRESS] - UPDATE ADDRESS - REQUEST',
	REQUEST_UPDATE_ADDRESS_LOADING: '[ADDRESS] - UPDATE ADDRESS - REQUEST - LOADING',

	REQUEST_REMOVE_ADDRESS: '[ADDRESS] - REMOVE ADDRESS - REQUEST',
	REQUEST_REMOVE_ADDRESS_LOADING: '[ADDRESS] - REMOVE ADDRESS - REQUEST - LOADING',
} as const

export const requestAddressItems = (uid: string) => ({
	type: ADDRESS_ACTIONS.REQUEST_ADDRESS_ITEMS,
	payload: uid,
})

export const requestAddressItemsLoading = (loading: boolean) => ({
	type: ADDRESS_ACTIONS.REQUEST_ADDRESS_ITEMS_LOADING,
	payload: loading,
})

export const setAddressItems = (payload: AddressItem[]) => ({
	type: ADDRESS_ACTIONS.SET_ADDRESS_ITEMS,
	payload,
})

export const clearAddressItems = () => ({
	type: ADDRESS_ACTIONS.CLEAR_ADDRESS_ITEMS,
})

export const requestAddAddress = (payload: Omit<AddressItem, 'id' | 'user_id'>) => ({
	type: ADDRESS_ACTIONS.REQUEST_ADD_ADDRESS,
	payload,
})

export const requestAddAddressLoading = (loading: boolean) => ({
	type: ADDRESS_ACTIONS.REQUEST_ADD_ADDRESS_LOADING,
	payload: loading,
})

export const requestUpdateAddress = (id: string, payload: Partial<AddressItem>) => ({
	type: ADDRESS_ACTIONS.REQUEST_UPDATE_ADDRESS,
	payload: { id, payload },
})

export const requestUpdateAddressLoading = (loading: boolean) => ({
	type: ADDRESS_ACTIONS.REQUEST_UPDATE_ADDRESS_LOADING,
	payload: loading,
})

export const requestRemoveAddress = (id: string) => ({
	type: ADDRESS_ACTIONS.REQUEST_REMOVE_ADDRESS,
	payload: id,
})

export const requestRemoveAddressLoading = (loading: boolean) => ({
	type: ADDRESS_ACTIONS.REQUEST_REMOVE_ADDRESS_LOADING,
	payload: loading,
})
