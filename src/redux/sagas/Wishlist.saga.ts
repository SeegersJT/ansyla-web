import { call, put, select, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import { navigate } from '@/utils/Navigator'
import type { RootState } from '../types/Root.type'
import {
	WISHLIST_ACTIONS,
	requestToggleWishlistItemLoading,
	requestWishlistItemsLoading,
	setWishlistItems,
} from '../actions/Wishlist.action'
import { addSystemNotification } from '../actions/Notification.action'

interface WishlistDoc {
	product_ids: string[]
}

function* handleWishlistItemsRequest(action: { type: string; payload: string }) {
	yield put(requestWishlistItemsLoading(true))

	try {
		const wishlistDoc: WishlistDoc | null = yield call(
			firestoreService.getById<WishlistDoc>,
			'Wishlists',
			action.payload
		)

		yield put(setWishlistItems(wishlistDoc?.product_ids ?? []))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Wishlist'
		yield put(addSystemNotification({ type: 'error', title: 'Wishlist', message: message }))
	} finally {
		yield put(requestWishlistItemsLoading(false))
	}
}

function* handleToggleWishlistItemRequest(action: { type: string; payload: string }) {
	const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)

	if (!uid) {
		yield put(
			addSystemNotification({
				type: 'info',
				title: 'Wishlist',
				message: 'Please log in to save pieces to your wishlist',
			})
		)
		yield call(navigate, '/dashboard')
		return
	}

	yield put(requestToggleWishlistItemLoading(true))

	try {
		const currentProductIds: string[] = yield select(
			(state: RootState) => state.wishlist.productIds
		)

		const productId = action.payload
		const updatedProductIds = currentProductIds.includes(productId)
			? currentProductIds.filter(id => id !== productId)
			: [...currentProductIds, productId]

		yield call([firestoreService, firestoreService.set], 'Wishlists', uid, {
			product_ids: updatedProductIds,
		})

		yield put(setWishlistItems(updatedProductIds))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Wishlist'
		yield put(addSystemNotification({ type: 'error', title: 'Wishlist', message: message }))
	} finally {
		yield put(requestToggleWishlistItemLoading(false))
	}
}

export function* wishlistSaga() {
	yield takeLatest(WISHLIST_ACTIONS.REQUEST_WISHLIST_ITEMS, handleWishlistItemsRequest)
	yield takeLatest(WISHLIST_ACTIONS.REQUEST_TOGGLE_WISHLIST_ITEM, handleToggleWishlistItemRequest)
}
