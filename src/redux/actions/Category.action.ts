import type { CategoryItem } from "../types/Category.type"

export const CATEGORY_ACTIONS = {
  REQUEST_CATEGORY_ITEMS: '[CATEGORY] - CATEGORY TYPES - REQUEST',
  REQUEST_CATEGORY_ITEMS_LOADING: '[CATEGORY] - CATEGORY TYPES - REQUEST - LOADING',
  SET_CATEGORY_ITEMS: '[CATEGORY] - CATEGORY TYPES - SET'
} as const

export const requestCategoryItems = () => ({
  type: CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS,
})

export const requestCategoryItemsLoading = (loading: boolean) => ({
  type: CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS_LOADING,
  payload: loading
})


export const setCategoryItems = (payload: CategoryItem[]) => ({
  type: CATEGORY_ACTIONS.SET_CATEGORY_ITEMS,
  payload
})