export interface ReviewItem {
	id: string
	product_id: string
	user_id: string
	user_name: string
	rating: number
	comment: string | null
	createdBy: string | null
	createdAt: Date | null
	updatedBy: string | null
	updatedAt: Date | null
}

export interface ReviewState {
	reviewData: ReviewItem[]
	reviewDataLoading: boolean
	submitReviewLoading: boolean
	removeReviewLoading: boolean
}
