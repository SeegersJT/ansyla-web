import type { ProductItem } from "../types/Product.type"

export const PRODUCT_ACTIONS = {
  REQUEST_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - REQUEST',
  REQUEST_PRODUCT_ITEMS_LOADING: '[PRODUCT] - PRODUCT TYPES - REQUEST - LOADING',
  SET_PRODUCT_ITEMS: '[PRODUCT] - PRODUCT TYPES - SET'
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