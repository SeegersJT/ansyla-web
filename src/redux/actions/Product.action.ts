import type { ProductItem } from '../types/Product.type'

export const PRODUCT_ACTIONS = {
	REQUEST_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - REQUEST',
	REQUEST_PRODUCT_ITEMS_LOADING: '[PRODUCT] - PRODUCT TYPES - REQUEST - LOADING',
	SET_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - SET',
	REQUEST_PRODUCT_BY_PRODUCT_NO: '[PRODUCT] - PRODUCT BY PRODUCT NUMBER - REQUEST',
	REQUEST_PRODUCT_BY_PRODUCT_NO_LOADING:
		'[PRODUCT] - PRODUCT BY PRODUCT NUMBER - REQUEST - LOADING',
	SET_PRODUCT_BY_PRODUCT_NO: '[PRODUCT] - PRODUCT BY PRODUCT NUMBER - SET',

	REQUEST_ADD_PRODUCT: '[PRODUCT] - ADD PRODUCT - REQUEST',
	REQUEST_ADD_PRODUCT_LOADING: '[PRODUCT] - ADD PRODUCT - REQUEST - LOADING',

	REQUEST_UPDATE_PRODUCT: '[PRODUCT] - UPDATE PRODUCT - REQUEST',
	REQUEST_UPDATE_PRODUCT_LOADING: '[PRODUCT] - UPDATE PRODUCT - REQUEST - LOADING',

	REQUEST_REMOVE_PRODUCT: '[PRODUCT] - REMOVE PRODUCT - REQUEST',
	REQUEST_REMOVE_PRODUCT_LOADING: '[PRODUCT] - REMOVE PRODUCT - REQUEST - LOADING',
} as const

export const requestProductItems = () => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS,
})

export const requestProductItemsLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS_LOADING,
	payload: loading,
})

export const setProductItems = (payload: ProductItem[]) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_ITEMS,
	payload,
})

export const requestProductByProductNo = (payload: string | undefined) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO,
	payload,
})

export const requestProductByProductNoLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO_LOADING,
	payload: loading,
})

export const setProductByProductNo = (payload: ProductItem) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_BY_PRODUCT_NO,
	payload,
})

export const requestAddProduct = (payload: Omit<ProductItem, 'id'>) => ({
	type: PRODUCT_ACTIONS.REQUEST_ADD_PRODUCT,
	payload,
})

export const requestAddProductLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.REQUEST_ADD_PRODUCT_LOADING,
	payload: loading,
})

export const requestUpdateProduct = (id: string, payload: Partial<ProductItem>) => ({
	type: PRODUCT_ACTIONS.REQUEST_UPDATE_PRODUCT,
	payload: { id, payload },
})

export const requestUpdateProductLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.REQUEST_UPDATE_PRODUCT_LOADING,
	payload: loading,
})

export const requestRemoveProduct = (id: string) => ({
	type: PRODUCT_ACTIONS.REQUEST_REMOVE_PRODUCT,
	payload: id,
})

export const requestRemoveProductLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.REQUEST_REMOVE_PRODUCT_LOADING,
	payload: loading,
})
