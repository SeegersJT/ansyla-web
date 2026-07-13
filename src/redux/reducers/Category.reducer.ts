import { CATEGORY_ACTIONS } from '../actions/Category.action'
import type { CategoryItem, CategoryState } from '../types/Category.type'

const initialState: CategoryState = {
	categoryData: [],
	categoryDataLoading: false,
	addCategoryLoading: false,
	updateCategoryLoading: false,
	removeCategoryLoading: false,
}

type Action = { type: string; payload?: unknown }

export const CategoryReducer = (state = initialState, action: Action): CategoryState => {
	switch (action.type) {
		case CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS_LOADING:
			return {
				...state,
				categoryDataLoading: action.payload as boolean,
			}

		case CATEGORY_ACTIONS.SET_CATEGORY_ITEMS:
			return {
				...state,
				categoryData: action.payload as CategoryItem[],
			}

		case CATEGORY_ACTIONS.REQUEST_ADD_CATEGORY_LOADING:
			return {
				...state,
				addCategoryLoading: action.payload as boolean,
			}

		case CATEGORY_ACTIONS.REQUEST_UPDATE_CATEGORY_LOADING:
			return {
				...state,
				updateCategoryLoading: action.payload as boolean,
			}

		case CATEGORY_ACTIONS.REQUEST_REMOVE_CATEGORY_LOADING:
			return {
				...state,
				removeCategoryLoading: action.payload as boolean,
			}

		default:
			return state
	}
}
