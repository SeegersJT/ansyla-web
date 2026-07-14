import ProductCard from '@/components/product-card/ProductCard.component'
import RatingInput from '@/components/rating-input/RatingInput.component'
import StarRating from '@/components/star-rating/StarRating.component'
import { colorMap, iconMap } from '@/containers/landing-page/product/Product.helper'
import type { ReviewItem } from '@/redux/types/Review.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { Settings } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'
import type { StockAvailabilityItem } from '@/utils/Utils.type'
import { Heart, Minus, Plus, Ruler, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router'

function Product({
	product,
	productLoading,
	zoom,
	settings,
	stockAvailibity,
	selectedQuantity,
	addedToWishList,
	relatedProducts,
	reviews,
	reviewsLoading,
	userReview,
	reviewRating,
	reviewComment,
	submittingReview,
	removingReview,
	isLoggedIn,
	onZoomChange,
	onQuantityChange,
	onAddToWishlistClick,
	onAddToCartClick,
	onReviewRatingChange,
	onReviewCommentChange,
	onSubmitReviewClick,
	onRemoveReviewClick,
}: {
	product: ProductItem
	productLoading: boolean
	zoom: boolean
	settings: Settings
	stockAvailibity: StockAvailabilityItem
	selectedQuantity: number
	addedToWishList: boolean
	relatedProducts: ProductItem[]
	reviews: ReviewItem[]
	reviewsLoading: boolean
	userReview: ReviewItem | undefined
	reviewRating: number
	reviewComment: string
	submittingReview: boolean
	removingReview: boolean
	isLoggedIn: boolean
	onZoomChange: (value: boolean) => void
	onQuantityChange: (quantity: number) => void
	onAddToWishlistClick: () => void
	onAddToCartClick: (product: ProductItem, selectedQuantity: number) => void
	onReviewRatingChange: (rating: number) => void
	onReviewCommentChange: (comment: string) => void
	onSubmitReviewClick: () => void
	onRemoveReviewClick: () => void
}) {
	if (productLoading) {
		return (
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-32 sm:px-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<nav className="mb-8 text-xs uppercase tracking-wider text-muted-foreground">
				<Link to="/" className="hover:text-primary">
					Home
				</Link>
				{' / '}
				<Link to="/shop" className="hover:text-primary">
					Shop
				</Link>
				{' / '}
				<span className="text-foreground">{product?.name}</span>
			</nav>

			<div className="grid gap-12 lg:grid-cols-2">
				<div
					className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card"
					onMouseEnter={() => onZoomChange(true)}
					onMouseLeave={() => onZoomChange(false)}
				>
					<img
						src={product?.images[0]?.url}
						alt={product?.name}
						className={`h-full w-full object-cover transition-transform duration-500 ${
							zoom ? 'scale-150' : 'scale-100'
						}`}
					/>
				</div>

				<div>
					<p className="text-xs uppercase tracking-luxe text-primary">
						{product?.category_name}
					</p>
					<h1 className="mt-2 font-serif text-4xl sm:text-5xl">{product?.name}</h1>
					<div className="mt-4">
						<StarRating rating={product?.rating} reviews={product?.reviews} />
					</div>
					<p className="mt-6 font-serif text-3xl text-primary">
						{Utils.formatPrice(product?.price ? product?.price : 0, settings?.currency)}
					</p>
					<p className="mt-6 leading-relaxed text-muted-foreground">
						{product?.description}
					</p>

					<dl className="mt-8 space-y-2 border-y border-border py-6 text-sm">
						<div className="flex gap-2">
							<dt className="w-32 text-muted-foreground">Material</dt>
							<dd>Coming Soon</dd>
						</div>
						<div className="flex gap-2">
							<dt className="w-32 text-muted-foreground">Occasion</dt>
							<dd>Coming Soon</dd>
						</div>
						<div className="flex gap-2">
							<dt className="w-32 text-muted-foreground">Availability</dt>
							<dd
								className={`flex items-center gap-1.5 ${colorMap[stockAvailibity?.variant]}`}
							>
								{iconMap[stockAvailibity?.icon]}
								{stockAvailibity?.label}
							</dd>
						</div>
					</dl>

					<div className="mt-8 flex items-center gap-4">
						<div className="flex items-center border border-border">
							<button
								onClick={() => onQuantityChange(Math.max(1, selectedQuantity - 1))}
								className="px-3.5 py-3 text-muted-foreground hover:text-primary"
								aria-label="Decrease"
							>
								<Minus className="h-4 w-4" />
							</button>
							<span className="w-10 text-center">{selectedQuantity}</span>
							<button
								onClick={() => onQuantityChange(selectedQuantity + 1)}
								className="px-3.5 py-3 text-muted-foreground hover:text-primary"
								aria-label="Increase"
							>
								<Plus className="h-4 w-4" />
							</button>
						</div>
						<button
							onClick={onAddToWishlistClick}
							className="flex h-12 w-12 items-center justify-center border border-border hover:border-primary"
							aria-label="Wishlist"
						>
							<Heart
								className={`h-5 w-5 ${addedToWishList ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
							/>
						</button>
					</div>

					<div className="mt-5 flex flex-col gap-3 sm:flex-row">
						<button
							onClick={() => onAddToCartClick(product, selectedQuantity)}
							className="flex-1 bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 hover:cursor-pointer"
						>
							Add to Cart
						</button>
					</div>

					<div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
						<span className="flex flex-col items-center gap-2">
							<Truck className="h-5 w-5 text-primary" />
							Insured Delivery
						</span>
						<span className="flex flex-col items-center gap-2">
							<ShieldCheck className="h-5 w-5 text-primary" />
							Authenticity Certified
						</span>
						<span className="flex flex-col items-center gap-2">
							<Ruler className="h-5 w-5 text-primary" />
							Size Guide Included
						</span>
					</div>
				</div>
			</div>

			<section className="mt-24 border-t border-border pt-16">
				<div className="mx-auto max-w-3xl">
					<h2 className="mb-8 text-center font-serif text-3xl">Ratings &amp; Reviews</h2>

					{isLoggedIn ? (
						<div className="mb-10 border border-border bg-card p-6">
							<h3 className="font-serif text-lg">
								{userReview ? 'Update Your Review' : 'Write a Review'}
							</h3>
							<div className="mt-4">
								<RatingInput value={reviewRating} onChange={onReviewRatingChange} />
							</div>
							<textarea
								value={reviewComment}
								onChange={e => onReviewCommentChange(e.target.value)}
								placeholder="Share your thoughts on this piece..."
								rows={3}
								className="mt-4 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
							/>
							<div className="mt-4 flex gap-3">
								<button
									onClick={onSubmitReviewClick}
									disabled={reviewRating === 0 || submittingReview}
									className="bg-gradient-gold px-6 py-2.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60 hover:cursor-pointer"
								>
									{submittingReview
										? 'Saving…'
										: userReview
											? 'Update Review'
											: 'Submit Review'}
								</button>
								{userReview && (
									<button
										onClick={onRemoveReviewClick}
										disabled={removingReview}
										className="border border-border px-6 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:border-destructive hover:text-destructive disabled:opacity-60 hover:cursor-pointer"
									>
										{removingReview ? 'Removing…' : 'Remove Review'}
									</button>
								)}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<p className="mb-2 text-center text-sm text-muted-foreground">
								Please log in to leave a rating and review.
							</p>
							<Link
								to="/dashboard"
								className="bg-gradient-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground mb-10"
							>
								Log In
							</Link>
						</div>
					)}

					{reviewsLoading ? (
						<p className="text-center text-sm text-muted-foreground">
							Loading reviews…
						</p>
					) : reviews.length === 0 ? (
						<p className="text-center text-sm text-muted-foreground">
							No reviews yet. Be the first to share your thoughts.
						</p>
					) : (
						<div className="space-y-6">
							{reviews.map(review => (
								<div
									key={review.id}
									className="border-b border-border pb-6 last:border-0"
								>
									<div className="flex items-center justify-between">
										<p className="font-serif text-base">{review.user_name}</p>
										<span className="text-xs text-muted-foreground">
											{String(review.createdAt)}
										</span>
									</div>
									<StarRating rating={review.rating} className="mt-1" />
									{review.comment && (
										<p className="mt-3 text-sm leading-relaxed text-foreground/90">
											{review.comment}
										</p>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			{relatedProducts.length > 0 && (
				<section className="mt-24">
					<h2 className="mb-10 text-center font-serif text-3xl">You May Also Love</h2>
					<div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
						{relatedProducts.map(relatedProduct => (
							<ProductCard
								key={relatedProduct?.id}
								currency={settings?.currency}
								product={relatedProduct}
							/>
						))}
					</div>
				</section>
			)}
		</div>
	)
}

export default Product
