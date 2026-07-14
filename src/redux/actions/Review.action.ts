import type { ReviewItem } from '../types/Review.type'

export const REVIEW_ACTIONS = {
	REQUEST_REVIEW_ITEMS: '[REVIEW] - REVIEW ITEMS - REQUEST',
	REQUEST_REVIEW_ITEMS_LOADING: '[REVIEW] - REVIEW ITEMS - REQUEST - LOADING',
	SET_REVIEW_ITEMS: '[REVIEW] - REVIEW ITEMS - SET',

	REQUEST_SUBMIT_REVIEW: '[REVIEW] - SUBMIT REVIEW - REQUEST',
	REQUEST_SUBMIT_REVIEW_LOADING: '[REVIEW] - SUBMIT REVIEW - REQUEST - LOADING',

	REQUEST_REMOVE_REVIEW: '[REVIEW] - REMOVE REVIEW - REQUEST',
	REQUEST_REMOVE_REVIEW_LOADING: '[REVIEW] - REMOVE REVIEW - REQUEST - LOADING',
} as const

export const requestReviewItems = (productId: string) => ({
	type: REVIEW_ACTIONS.REQUEST_REVIEW_ITEMS,
	payload: productId,
})

export const requestReviewItemsLoading = (loading: boolean) => ({
	type: REVIEW_ACTIONS.REQUEST_REVIEW_ITEMS_LOADING,
	payload: loading,
})

export const setReviewItems = (payload: ReviewItem[]) => ({
	type: REVIEW_ACTIONS.SET_REVIEW_ITEMS,
	payload,
})

export const requestSubmitReview = (productId: string, rating: number, comment: string) => ({
	type: REVIEW_ACTIONS.REQUEST_SUBMIT_REVIEW,
	payload: { productId, rating, comment },
})

export const requestSubmitReviewLoading = (loading: boolean) => ({
	type: REVIEW_ACTIONS.REQUEST_SUBMIT_REVIEW_LOADING,
	payload: loading,
})

export const requestRemoveReview = (productId: string) => ({
	type: REVIEW_ACTIONS.REQUEST_REMOVE_REVIEW,
	payload: productId,
})

export const requestRemoveReviewLoading = (loading: boolean) => ({
	type: REVIEW_ACTIONS.REQUEST_REMOVE_REVIEW_LOADING,
	payload: loading,
})
