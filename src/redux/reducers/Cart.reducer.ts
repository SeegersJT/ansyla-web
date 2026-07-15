import { CART_ACTIONS } from '../actions/Cart.action'
import type { CartItem, CartState } from '../types/Cart.type'

const initialState: CartState = {
	cartData: [],
	cartDataCount: 0,
	cartDataSubtotal: 0,
	isCartDrawerOpen: false,
	cartDataLoading: false,
}

type Action = { type: string; payload?: unknown }

export const CartReducer = (state = initialState, action: Action): CartState => {
	switch (action.type) {
		case CART_ACTIONS.ADD_TO_CART: {
			const incoming = action.payload as CartItem
			const maxQuantity = Math.max(0, incoming?.product?.stock ?? 0)

			if (maxQuantity <= 0) return state

			const exists = state.cartData.find(item => item?.product?.id === incoming?.product?.id)

			const updatedCart = exists
				? state.cartData.map(item =>
						item?.product?.id === incoming?.product?.id
							? {
									...item,
									quantity: Math.min(
										maxQuantity,
										item?.quantity + incoming?.quantity
									),
								}
							: item
					)
				: [
						...state.cartData,
						{ ...incoming, quantity: Math.min(maxQuantity, incoming.quantity) },
					]

			return {
				...state,
				cartData: updatedCart,
				cartDataCount: updatedCart.reduce((total, item) => total + item?.quantity, 0),
				cartDataSubtotal: updatedCart.reduce(
					(total, item) => total + item?.product?.price * item?.quantity,
					0
				),
			}
		}

		case CART_ACTIONS.REMOVE_FROM_CART: {
			const productId = action.payload as string
			const exists = state.cartData.find(item => item.product?.id === productId)

			if (!exists) return state

			const updatedCart =
				exists.quantity > 1
					? state.cartData.map(item =>
							item?.product?.id === productId
								? { ...item, quantity: item?.quantity - 1 }
								: item
						)
					: state.cartData.filter(item => item?.product?.id !== productId)

			return {
				...state,
				cartData: updatedCart,
				cartDataCount: updatedCart.reduce((total, item) => total + item?.quantity, 0),
				cartDataSubtotal: updatedCart.reduce(
					(total, item) => total + item?.product?.price * item?.quantity,
					0
				),
			}
		}

		case CART_ACTIONS.REMOVE_ALL_OF_PRODUCT: {
			const productId = action.payload as string

			const updatedCart = state.cartData.filter(item => item?.product?.id !== productId)

			return {
				...state,
				cartData: updatedCart,
				cartDataCount: updatedCart.reduce((total, item) => total + item?.quantity, 0),
				cartDataSubtotal: updatedCart.reduce(
					(total, item) => total + item?.product?.price * item?.quantity,
					0
				),
			}
		}

		case CART_ACTIONS.SET_CART_DRAWER_OPEN: {
			const isOpen = action.payload as boolean
			return {
				...state,
				isCartDrawerOpen: isOpen,
			}
		}

		case CART_ACTIONS.CLEAR_CART:
			return initialState

		default:
			return state
	}
}
