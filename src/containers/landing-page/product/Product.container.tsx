import Product from '@/components/landing-page/product/Product.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addToCart, setCartDrawerOpen } from '@/redux/actions/Cart.action'
import { requestProductByProductNo } from '@/redux/actions/Product.action'
import {
	requestRemoveReview,
	requestReviewItems,
	requestSubmitReview,
} from '@/redux/actions/Review.action'
import { requestToggleWishlistItem } from '@/redux/actions/Wishlist.action'
import type { ProductItem } from '@/redux/types/Product.type'
import { Utils } from '@/utils/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function ProductContainer() {
	const dispatch = useAppDispatch()

	const { selectedProduct, selectedProductLoading } = useAppSelector(state => state.product)
	const { settingsData } = useAppSelector(state => state.settings)
	const { productIds } = useAppSelector(state => state.wishlist)
	const { user } = useAppSelector(state => state.auth)
	const { reviewData, reviewDataLoading, submitReviewLoading, removeReviewLoading } =
		useAppSelector(state => state.review)

	const { context } = useParams<{ context: string }>()

	const [zoom, setZoom] = useState<boolean>(false)
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
	const [reviewRating, setReviewRating] = useState<number>(0)
	const [reviewComment, setReviewComment] = useState<string>('')

	const stockAvailibility = Utils.calculateStockAvailability(selectedProduct?.stock)
	const addedToWishList = productIds.includes(selectedProduct?.id)
	const userReview = reviewData.find(review => review.user_id === user?.uid)

	const handleOnZoomChange = (value: boolean) => {
		setZoom(value)
	}

	const handleOnQuantityChange = (value: number) => {
		setSelectedQuantity(value)
	}

	const handleOnAddToWishListClick = () => {
		dispatch(requestToggleWishlistItem(selectedProduct.id))
	}

	const handleOnAddToCartClick = (product: ProductItem, selectedQuantity: number) => {
		dispatch(setCartDrawerOpen(true))
		dispatch(addToCart(product, selectedQuantity))
	}

	const handleOnReviewRatingChange = (rating: number) => {
		setReviewRating(rating)
	}

	const handleOnReviewCommentChange = (comment: string) => {
		setReviewComment(comment)
	}

	const handleOnSubmitReviewClick = () => {
		if (!context || reviewRating === 0) return

		dispatch(requestSubmitReview(context, reviewRating, reviewComment))
	}

	const handleOnRemoveReviewClick = () => {
		if (!context) return

		dispatch(requestRemoveReview(context))
	}

	useEffect(() => {
		dispatch(requestProductByProductNo(context))
	}, [dispatch, context])

	useEffect(() => {
		if (!context) return

		dispatch(requestReviewItems(context))
	}, [dispatch, context])

	useEffect(() => {
		setReviewRating(userReview?.rating ?? 0)
		setReviewComment(userReview?.comment ?? '')
	}, [userReview])

	return (
		<Product
			product={selectedProduct}
			productLoading={selectedProductLoading}
			zoom={zoom}
			settings={settingsData[0]}
			stockAvailibity={stockAvailibility}
			selectedQuantity={selectedQuantity}
			addedToWishList={addedToWishList}
			relatedProducts={[]}
			reviews={reviewData}
			reviewsLoading={reviewDataLoading}
			userReview={userReview}
			reviewRating={reviewRating}
			reviewComment={reviewComment}
			submittingReview={submitReviewLoading}
			removingReview={removeReviewLoading}
			isLoggedIn={!!user}
			onZoomChange={handleOnZoomChange}
			onQuantityChange={handleOnQuantityChange}
			onAddToWishlistClick={handleOnAddToWishListClick}
			onAddToCartClick={handleOnAddToCartClick}
			onReviewRatingChange={handleOnReviewRatingChange}
			onReviewCommentChange={handleOnReviewCommentChange}
			onSubmitReviewClick={handleOnSubmitReviewClick}
			onRemoveReviewClick={handleOnRemoveReviewClick}
		/>
	)
}

export default ProductContainer
