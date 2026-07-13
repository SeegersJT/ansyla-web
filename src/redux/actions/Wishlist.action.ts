export const WISHLIST_ACTIONS = {
	REQUEST_WISHLIST_ITEMS: '[WISHLIST] - WISHLIST ITEMS - REQUEST',
	REQUEST_WISHLIST_ITEMS_LOADING: '[WISHLIST] - WISHLIST ITEMS - REQUEST - LOADING',
	SET_WISHLIST_ITEMS: '[WISHLIST] - WISHLIST ITEMS - SET',
	CLEAR_WISHLIST_ITEMS: '[WISHLIST] - WISHLIST ITEMS - CLEAR',

	REQUEST_TOGGLE_WISHLIST_ITEM: '[WISHLIST] - TOGGLE WISHLIST ITEM - REQUEST',
	REQUEST_TOGGLE_WISHLIST_ITEM_LOADING: '[WISHLIST] - TOGGLE WISHLIST ITEM - REQUEST - LOADING',
} as const

export const requestWishlistItems = (uid: string) => ({
	type: WISHLIST_ACTIONS.REQUEST_WISHLIST_ITEMS,
	payload: uid,
})

export const requestWishlistItemsLoading = (loading: boolean) => ({
	type: WISHLIST_ACTIONS.REQUEST_WISHLIST_ITEMS_LOADING,
	payload: loading,
})

export const setWishlistItems = (productIds: string[]) => ({
	type: WISHLIST_ACTIONS.SET_WISHLIST_ITEMS,
	payload: productIds,
})

export const clearWishlistItems = () => ({
	type: WISHLIST_ACTIONS.CLEAR_WISHLIST_ITEMS,
})

export const requestToggleWishlistItem = (productId: string) => ({
	type: WISHLIST_ACTIONS.REQUEST_TOGGLE_WISHLIST_ITEM,
	payload: productId,
})

export const requestToggleWishlistItemLoading = (loading: boolean) => ({
	type: WISHLIST_ACTIONS.REQUEST_TOGGLE_WISHLIST_ITEM_LOADING,
	payload: loading,
})
