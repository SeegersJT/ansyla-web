import { REVIEW_ACTIONS } from '../actions/Review.action'
import type { ReviewItem, ReviewState } from '../types/Review.type'

const initialState: ReviewState = {
	reviewData: [],
	reviewDataLoading: false,
	submitReviewLoading: false,
	removeReviewLoading: false,
}

type Action = { type: string; payload?: unknown }

export const ReviewReducer = (state = initialState, action: Action): ReviewState => {
	switch (action.type) {
		case REVIEW_ACTIONS.REQUEST_REVIEW_ITEMS_LOADING:
			return { ...state, reviewDataLoading: action.payload as boolean }

		case REVIEW_ACTIONS.SET_REVIEW_ITEMS:
			return { ...state, reviewData: action.payload as ReviewItem[] }

		case REVIEW_ACTIONS.REQUEST_SUBMIT_REVIEW_LOADING:
			return { ...state, submitReviewLoading: action.payload as boolean }

		case REVIEW_ACTIONS.REQUEST_REMOVE_REVIEW_LOADING:
			return { ...state, removeReviewLoading: action.payload as boolean }

		default:
			return state
	}
}
