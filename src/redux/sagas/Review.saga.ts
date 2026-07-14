import { call, put, select, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import { navigate } from '@/utils/Navigator'
import { requestProductByProductNo, requestProductItems } from '../actions/Product.action'
import { addSystemNotification } from '../actions/Notification.action'
import type { ReviewItem } from '../types/Review.type'
import type { RootState } from '../types/Root.type'
import {
	REVIEW_ACTIONS,
	requestRemoveReviewLoading,
	requestReviewItems,
	requestReviewItemsLoading,
	requestSubmitReviewLoading,
	setReviewItems,
} from '../actions/Review.action'

/**
 * The product's `rating`/`reviews` fields are never trusted from the client —
 * every add/edit/remove recomputes them here from the full set of Reviews
 * documents and writes the aggregate back onto the product itself.
 */
function* recalculateProductRating(productId: string) {
	const reviews: ReviewItem[] = yield call(
		[firestoreService, firestoreService.getAll],
		'Reviews',
		[firestoreService.where('product_id', '==', productId)]
	)

	const reviewCount = reviews.length
	const averageRating =
		reviewCount === 0
			? 0
			: Math.round(
					(reviews.reduce((total, review) => total + review.rating, 0) / reviewCount) * 10
				) / 10

	yield call([firestoreService, firestoreService.update], 'Products', productId, {
		rating: averageRating,
		reviews: reviewCount,
	})
}

function* handleReviewItemsRequest(action: { type: string; payload: string }) {
	yield put(requestReviewItemsLoading(true))

	try {
		const reviews: ReviewItem[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Reviews',
			[firestoreService.where('product_id', '==', action.payload)]
		)

		const sorted = [...reviews].sort((a, b) =>
			String(b.createdAt).localeCompare(String(a.createdAt))
		)

		yield put(setReviewItems(sorted))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Reviews'
		yield put(addSystemNotification({ type: 'error', title: 'Reviews', message: message }))
	} finally {
		yield put(requestReviewItemsLoading(false))
	}
}

function* handleSubmitReviewRequest(action: {
	type: string
	payload: { productId: string; rating: number; comment: string }
}) {
	const user: { uid: string; displayName: string | null; email: string | null } | null =
		yield select((state: RootState) => state.auth.user)

	if (!user) {
		yield put(
			addSystemNotification({
				type: 'info',
				title: 'Reviews',
				message: 'Please log in to leave a rating',
			})
		)
		yield call(navigate, '/dashboard')
		return
	}

	yield put(requestSubmitReviewLoading(true))

	try {
		const { productId, rating, comment } = action.payload
		const reviewId = `${productId}_${user.uid}`

		const existingReviews: ReviewItem[] = yield select(
			(state: RootState) => state.review.reviewData
		)
		const isEditing = existingReviews.some(review => review.id === reviewId)

		yield call([firestoreService, firestoreService.set], 'Reviews', reviewId, {
			product_id: productId,
			user_id: user.uid,
			user_name: user.displayName ?? user.email ?? 'ANSYLA Customer',
			rating,
			comment: comment || null,
			updatedBy: user.uid,
			...(isEditing ? {} : { createdBy: user.uid, createdAt: new Date() }),
		})

		yield call(recalculateProductRating, productId)

		yield put(requestReviewItems(productId))
		yield put(requestProductByProductNo(productId))
		yield put(requestProductItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Reviews',
				message: isEditing ? 'Your review was updated' : 'Thank you for your review',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Submit Review'
		yield put(addSystemNotification({ type: 'error', title: 'Reviews', message: message }))
	} finally {
		yield put(requestSubmitReviewLoading(false))
	}
}

function* handleRemoveReviewRequest(action: { type: string; payload: string }) {
	const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)

	if (!uid) return

	yield put(requestRemoveReviewLoading(true))

	try {
		const productId = action.payload
		const reviewId = `${productId}_${uid}`

		yield call([firestoreService, firestoreService.remove], 'Reviews', reviewId)
		yield call(recalculateProductRating, productId)

		yield put(requestReviewItems(productId))
		yield put(requestProductByProductNo(productId))
		yield put(requestProductItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Reviews',
				message: 'Your review was removed',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Remove Review'
		yield put(addSystemNotification({ type: 'error', title: 'Reviews', message: message }))
	} finally {
		yield put(requestRemoveReviewLoading(false))
	}
}

export function* reviewSaga() {
	yield takeLatest(REVIEW_ACTIONS.REQUEST_REVIEW_ITEMS, handleReviewItemsRequest)
	yield takeLatest(REVIEW_ACTIONS.REQUEST_SUBMIT_REVIEW, handleSubmitReviewRequest)
	yield takeLatest(REVIEW_ACTIONS.REQUEST_REMOVE_REVIEW, handleRemoveReviewRequest)
}
