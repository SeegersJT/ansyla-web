import { Link } from 'react-router'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addToCart, setCartDrawerOpen } from '@/redux/actions/Cart.action'
import { requestToggleWishlistItem } from '@/redux/actions/Wishlist.action'
import type { ProductItem } from '@/redux/types/Product.type'
import StarRating from '../star-rating/StarRating.component'
import { Utils } from '@/utils/Utils'

function ProductCard({ currency, product }: { currency: string; product: ProductItem }) {
	const dispatch = useAppDispatch()

	const isWishlisted = useAppSelector(state => state.wishlist.productIds.includes(product.id))
	const cartQuantity = useAppSelector(
		state => state.cart.cartData.find(item => item.product?.id === product.id)?.quantity ?? 0
	)

	const stock = product?.stock ?? 0
	const outOfStock = stock <= 0
	const atMaxInCart = !outOfStock && cartQuantity >= stock
	const addDisabled = outOfStock || atMaxInCart

	const addLabel = outOfStock ? 'Out of Stock' : atMaxInCart ? 'Max in Cart' : 'Add'

	const handleOnAddCartItemClick = (product: ProductItem, quantity: number) => {
		if (addDisabled) return

		dispatch(setCartDrawerOpen(true))
		dispatch(addToCart(product, quantity))
	}

	const handleOnWishlistToggleClick = () => {
		dispatch(requestToggleWishlistItem(product.id))
	}

	return (
		<div className="group relative flex flex-col">
			<div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card">
				<Link to={`/product/${product?.id}`}>
					<img
						src={`${product?.images[0]?.url}`}
						alt={product?.name}
						loading="lazy"
						width={800}
						height={800}
						className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
							outOfStock ? 'opacity-60 grayscale' : ''
						}`}
					/>
				</Link>

				<div className="absolute left-3 top-3 flex flex-col gap-1.5">
					{outOfStock ? (
						<span className="border border-destructive/60 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-luxe text-destructive backdrop-blur">
							Out of Stock
						</span>
					) : (
						<>
							{product?.is_new && (
								<span className="bg-gradient-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-luxe text-primary-foreground">
									New
								</span>
							)}
							{product?.is_best_seller && (
								<span className="border border-primary/60 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-luxe text-primary backdrop-blur">
									Best Seller
								</span>
							)}
						</>
					)}
				</div>

				<button
					onClick={handleOnWishlistToggleClick}
					className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full  border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary"
					aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
				>
					<Heart
						className={`h-4 w-4 ${isWishlisted ? 'fill-primary text-primary' : 'text-foreground'}`}
					/>
				</button>

				<div className="absolute inset-x-3 bottom-3 flex translate-y-3 flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
					{atMaxInCart && (
						<p className="text-center text-[10px] text-muted-foreground bg-background/70 backdrop-blur py-1">
							All {stock} in stock are already in your cart
						</p>
					)}
					<div className="flex gap-2">
						<button
							onClick={() => handleOnAddCartItemClick(product, 1)}
							disabled={addDisabled}
							className="flex flex-1 items-center justify-center  gap-2 bg-gradient-gold py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<ShoppingBag className="h-3.5 w-3.5" /> {addLabel}
						</button>
						<Link
							to={`/product/${product?.id}`}
							className="flex items-center justify-center border border-primary/50 bg-background/70 px-3 text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
							aria-label="Quick view"
						>
							<Eye className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-4 space-y-1.5">
				<p className="text-[11px] uppercase tracking-luxe text-primary/80">
					{product?.category_name}
				</p>
				<Link
					to={`/product/${product?.id}`}
					className="block font-serif text-lg leading-tight transition-colors hover:text-primary"
				>
					{product?.name}
				</Link>
				<StarRating rating={product?.rating} reviews={product?.reviews} />
				<p className="pt-0.5 text-base text-foreground">
					{Utils.formatPrice(product?.price, currency)}
				</p>
				{!outOfStock && stock < 10 && (
					<p className="text-xs text-muted-foreground">
						{Utils.calculateStockAvailability(stock).label}
					</p>
				)}
			</div>
		</div>
	)
}

export default ProductCard
