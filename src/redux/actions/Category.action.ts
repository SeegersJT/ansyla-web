import type { CategoryItem } from '../types/Category.type'

export const CATEGORY_ACTIONS = {
	REQUEST_CATEGORY_ITEMS: '[CATEGORY] - CATEGORY TYPES - REQUEST',
	REQUEST_CATEGORY_ITEMS_LOADING: '[CATEGORY] - CATEGORY TYPES - REQUEST - LOADING',
	SET_CATEGORY_ITEMS: '[CATEGORY] - CATEGORY TYPES - SET',

	REQUEST_ADD_CATEGORY: '[CATEGORY] - ADD CATEGORY - REQUEST',
	REQUEST_ADD_CATEGORY_LOADING: '[CATEGORY] - ADD CATEGORY - REQUEST - LOADING',

	REQUEST_UPDATE_CATEGORY: '[CATEGORY] - UPDATE CATEGORY - REQUEST',
	REQUEST_UPDATE_CATEGORY_LOADING: '[CATEGORY] - UPDATE CATEGORY - REQUEST - LOADING',

	REQUEST_REMOVE_CATEGORY: '[CATEGORY] - REMOVE CATEGORY - REQUEST',
	REQUEST_REMOVE_CATEGORY_LOADING: '[CATEGORY] - REMOVE CATEGORY - REQUEST - LOADING',
} as const

export const requestCategoryItems = () => ({
	type: CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS,
})

export const requestCategoryItemsLoading = (loading: boolean) => ({
	type: CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS_LOADING,
	payload: loading,
})

export const setCategoryItems = (payload: CategoryItem[]) => ({
	type: CATEGORY_ACTIONS.SET_CATEGORY_ITEMS,
	payload,
})

export const requestAddCategory = (payload: Omit<CategoryItem, 'id' | 'category_no'>) => ({
	type: CATEGORY_ACTIONS.REQUEST_ADD_CATEGORY,
	payload,
})

export const requestAddCategoryLoading = (loading: boolean) => ({
	type: CATEGORY_ACTIONS.REQUEST_ADD_CATEGORY_LOADING,
	payload: loading,
})

export const requestUpdateCategory = (id: string, payload: Partial<CategoryItem>) => ({
	type: CATEGORY_ACTIONS.REQUEST_UPDATE_CATEGORY,
	payload: { id, payload },
})

export const requestUpdateCategoryLoading = (loading: boolean) => ({
	type: CATEGORY_ACTIONS.REQUEST_UPDATE_CATEGORY_LOADING,
	payload: loading,
})

export const requestRemoveCategory = (id: string) => ({
	type: CATEGORY_ACTIONS.REQUEST_REMOVE_CATEGORY,
	payload: id,
})

export const requestRemoveCategoryLoading = (loading: boolean) => ({
	type: CATEGORY_ACTIONS.REQUEST_REMOVE_CATEGORY_LOADING,
	payload: loading,
})
