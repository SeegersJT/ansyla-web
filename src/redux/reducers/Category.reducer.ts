import { CATEGORY_ACTIONS } from "../actions/Category.action";
import type { CategoryItem, CategoryState } from "../types/Category.type";

const initialState: CategoryState = {
  category_data: [],
  loading: false,
}

type Action = { type: string; payload?: unknown }

export const CategoryReducer = (state = initialState, action: Action): CategoryState => {
  switch (action.type) {
    case CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }

    case CATEGORY_ACTIONS.SET_CATEGORY_ITEMS:
      return {
        ...state,
        category_data: action.payload as CategoryItem[],
      }

    default:
      return state
  }
}
