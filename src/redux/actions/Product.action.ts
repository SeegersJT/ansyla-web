import type { ProductItem } from "../types/Product.type"

export const PRODUCT_ACTIONS = {
  REQUEST_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - REQUEST',
  REQUEST_PRODUCT_ITEMS_LOADING: '[PRODUCT] - PRODUCT TYPES - REQUEST - LOADING',
  SET_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - SET',
  REQUEST_PRODUCT_BY_PRODUCT_NO: '[PRODUCT] - PRODUCT BY PRODUCT NUMBER - REQUEST',
  REQUEST_PRODUCT_BY_PRODUCT_NO_LOADING: '[PRODUCT] - PRODUCT BY PRODUCT NUMBER - REQUEST - LOADING',
  SET_PRODUCT_BY_PRODUCT_NO: '[PRODUCT] - PRODUCT BY PRODUCT NUMBER - SET'
} as const

export const requestProductItems = () => ({
  type: PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS,
})

export const requestProductItemsLoading = (loading: boolean) => ({
  type: PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS_LOADING,
  payload: loading
})

export const setProductItems = (payload: ProductItem[]) => ({
  type: PRODUCT_ACTIONS.SET_PRODUCT_ITEMS,
  payload
})

export const requestProductByProductNo = (payload: string | undefined) => ({
  type: PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO,
  payload
})

export const requestProductByProductNoLoading = (loading: boolean) => ({
  type: PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO_LOADING,
  payload: loading
})

export const setProductByProductNo = (payload: ProductItem) => ({
  type: PRODUCT_ACTIONS.SET_PRODUCT_BY_PRODUCT_NO,
  payload
})