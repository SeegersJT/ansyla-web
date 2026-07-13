import type { CustomerItem } from '../types/Customer.type'

export const CUSTOMER_ACTIONS = {
	REQUEST_CUSTOMER_ITEMS: '[CUSTOMER] - CUSTOMER ITEMS - REQUEST',
	REQUEST_CUSTOMER_ITEMS_LOADING: '[CUSTOMER] - CUSTOMER ITEMS - REQUEST - LOADING',
	SET_CUSTOMER_ITEMS: '[CUSTOMER] - CUSTOMER ITEMS - SET',
} as const

export const requestCustomerItems = () => ({
	type: CUSTOMER_ACTIONS.REQUEST_CUSTOMER_ITEMS,
})

export const requestCustomerItemsLoading = (loading: boolean) => ({
	type: CUSTOMER_ACTIONS.REQUEST_CUSTOMER_ITEMS_LOADING,
	payload: loading,
})

export const setCustomerItems = (payload: CustomerItem[]) => ({
	type: CUSTOMER_ACTIONS.SET_CUSTOMER_ITEMS,
	payload,
})
