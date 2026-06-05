import type { CartItem } from "../types/Cart.type"
import type { ProductItem } from "../types/Product.type"

export const CART_ACTIONS = {
  ADD_TO_CART: '[CART] - ADD TO CART',
  REMOVE_FROM_CART: '[CART] - REMOVE FROM CART',
} as const

export const addToCart = (product: ProductItem, quantity: number) => ({
  type: CART_ACTIONS.ADD_TO_CART,
  payload: { product, quantity } as CartItem
})

export const removeFromCart = (productId: string) => ({
  type: CART_ACTIONS.REMOVE_FROM_CART,
  payload: productId
})