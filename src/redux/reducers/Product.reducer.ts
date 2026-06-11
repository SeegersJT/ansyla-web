import { PRODUCT_ACTIONS } from "../actions/Product.action";
import { defaultProductItem, type ProductItem, type ProductState } from "../types/Product.type";

const initialState: ProductState = {
  productData: [],
  selectedProduct: defaultProductItem,
  productDataloading: false,
  selectedProductLoading: false,
}

type Action = { type: string; payload?: unknown }

export const ProductReducer = (state = initialState, action: Action): ProductState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS_LOADING:
      return {
        ...state,
        productDataloading: action.payload as boolean,
      }

    case PRODUCT_ACTIONS.SET_PRODUCT_ITEMS:
      return {
        ...state,
        productData: action.payload as ProductItem[],
      }

    case PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO_LOADING:
      return {
        ...state,
        selectedProductLoading: action.payload as boolean,
      }

    case PRODUCT_ACTIONS.SET_PRODUCT_BY_PRODUCT_NO:
      return {
        ...state,
        selectedProduct: action.payload as ProductItem,
      }

    default:
      return state
  }
}
