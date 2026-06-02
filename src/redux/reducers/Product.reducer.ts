import { PRODUCT_ACTIONS } from "../actions/Product.actions";
import type { ProductItem, ProductState } from "../types/Product.type";

const initialState: ProductState = {
  product_data: [],
  loading: false,
}

type Action = { type: string; payload?: unknown }

export const ProductReducer = (state = initialState, action: Action): ProductState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }

    case PRODUCT_ACTIONS.SET_PRODUCT_ITEMS:
      return {
        ...state,
        product_data: action.payload as ProductItem[],
      }

    default:
      return state
  }
}
