import { CART_ACTIONS } from "../actions/Cart.action"
import type { CartItem, CartState } from "../types/Cart.type"

const initialState: CartState = {
  cartData: [],
  cartDataLoading: false,
}

type Action = { type: string; payload?: unknown }

export const CartReducer = (state = initialState, action: Action): CartState => {
  switch (action.type) {

    case CART_ACTIONS.ADD_TO_CART: {
      const incoming = action.payload as CartItem

      const exists = state.cartData.find((item) => item.product.id === incoming.product.id)

      if (exists) {
        return {
          ...state,
          cartData: state.cartData.map((item) =>
            item.product.id === incoming.product.id
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item
          ),
        }
      }

      return {
        ...state,
        cartData: [...state.cartData, incoming],
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const productId = action.payload as string
      const exists = state.cartData.find((item) => item.product.id === productId)

      if (!exists) return state

      if (exists.quantity > 1) {
        return {
          ...state,
          cartData: state.cartData.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }
      }

      return {
        ...state,
        cartData: state.cartData.filter((item) => item.product.id !== productId),
      }
    }

    default:
      return state
  }
}