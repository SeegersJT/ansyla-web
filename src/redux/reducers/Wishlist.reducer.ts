import { WISHLIST_ACTIONS } from '../actions/Wishlist.action'
import type { WishlistState } from '../types/Wishlist.type'

const initialState: WishlistState = {
	productIds: [],
	wishlistLoading: false,
	toggleWishlistLoading: false,
}

type Action = { type: string; payload?: unknown }

export const WishlistReducer = (state = initialState, action: Action): WishlistState => {
	switch (action.type) {
		case WISHLIST_ACTIONS.REQUEST_WISHLIST_ITEMS_LOADING:
			return {
				...state,
				wishlistLoading: action.payload as boolean,
			}

		case WISHLIST_ACTIONS.SET_WISHLIST_ITEMS:
			return {
				...state,
				productIds: action.payload as string[],
			}

		case WISHLIST_ACTIONS.CLEAR_WISHLIST_ITEMS:
			return initialState

		case WISHLIST_ACTIONS.REQUEST_TOGGLE_WISHLIST_ITEM_LOADING:
			return {
				...state,
				toggleWishlistLoading: action.payload as boolean,
			}

		default:
			return state
	}
}
