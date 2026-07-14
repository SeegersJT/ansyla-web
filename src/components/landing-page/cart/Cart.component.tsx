import type { CartItem } from '@/redux/types/Cart.type'
import type { CouponItem } from '@/redux/types/Coupon.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { Settings } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'
import { Minus, Plus, Tag, Trash2 } from 'lucide-react'
import { Link } from 'react-router'

function Cart({
	cartData,
	settings,
	cartDataSubtotal,
	coupon,
	couponItem,
	isCouponApplied,
	shippingCost,
	discount,
	total,
	couponLoading,
	onRemoveAllOfProductClick,
	onRemoveCartItemClick,
	onAddCartItemClick,
	onCouponChange,
	onApplyCouponClick,
}: {
	cartData: CartItem[]
	settings: Settings
	cartDataSubtotal: number
	coupon: string
	couponItem: CouponItem
	isCouponApplied: boolean
	shippingCost: number
	discount: number
	total: number
	couponLoading: boolean
	onRemoveAllOfProductClick: (productId: string) => void
	onRemoveCartItemClick: (productId: string) => void
	onAddCartItemClick: (product: ProductItem, quantity: number) => void
	onCouponChange: (coupon: string) => void
	onApplyCouponClick: () => void
}) {
	return cartData.length === 0 ? (
		<div className="mx-auto max-w-2xl px-6 py-32 text-center">
			<h1 className="font-serif text-4xl">Your cart is empty</h1>
			<p className="mt-3 text-muted-foreground">Discover something timeless to treasure.</p>
			<Link
				to="/shop"
				className="mt-8 inline-block bg-gradient-gold px-8 py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
			>
				Shop Collection
			</Link>
		</div>
	) : (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<h1 className="mb-10 font-serif text-4xl sm:text-5xl">Shopping Cart</h1>

			<div className="grid gap-12 lg:grid-cols-[1fr_360px]">
				<div className="divide-y divide-border border-y border-border">
					{cartData.map(({ product, quantity }) => (
						<div key={product?.id} className="flex gap-5 py-6">
							<img
								src={product?.images[0]?.url}
								alt={product?.name}
								loading="lazy"
								className="h-28 w-28 flex-shrink-0 rounded-sm border border-border object-cover"
							/>
							<div className="flex flex-1 flex-col">
								<div className="flex justify-between gap-3">
									<Link
										to={`/product/${product?.id}`}
										className="font-serif text-xl hover:text-primary"
									>
										{product?.name}
									</Link>
									<button
										onClick={() => onRemoveAllOfProductClick(product?.id)}
										aria-label="Remove"
									>
										<Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
									</button>
								</div>
								{/* <p className="mt-1 text-sm text-muted-foreground">{product?.material}</p> */}
								<div className="mt-auto flex items-center justify-between">
									<div className="flex items-center border border-border">
										<button
											onClick={() => onRemoveCartItemClick(product?.id)}
											className="px-3 py-2 text-muted-foreground hover:text-primary"
											aria-label="Decrease"
										>
											<Minus className="h-3.5 w-3.5" />
										</button>
										<span className="w-9 text-center text-sm">{quantity}</span>
										<button
											onClick={() => onAddCartItemClick(product, 1)}
											className="px-3 py-2 text-muted-foreground hover:text-primary"
											aria-label="Increase"
										>
											<Plus className="h-3.5 w-3.5" />
										</button>
									</div>
									<p className="font-serif text-lg text-primary">
										{Utils.formatPrice(
											product?.price * quantity,
											settings.currency
										)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<aside className="h-fit border border-border bg-card p-6">
					<h2 className="font-serif text-2xl">Order Summary</h2>

					<div className="mt-6 flex gap-2">
						<input
							value={coupon}
							onChange={event => onCouponChange(event.target.value)}
							placeholder="Coupon code"
							disabled={couponLoading}
							className="flex-1 border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50"
						/>
						<button
							onClick={onApplyCouponClick}
							disabled={couponLoading}
							className="flex items-center gap-1.5 border border-primary px-4 text-xs uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
						>
							<Tag className="h-3.5 w-3.5" /> {couponLoading ? 'Applying…' : 'Apply'}
						</button>
					</div>
					{isCouponApplied && (
						<p className="mt-2 text-xs text-primary">{`Coupon ${couponItem?.coupon_code} applied - ${couponItem?.discount_percentage}% off!`}</p>
					)}

					<div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
						<Row
							label="Subtotal"
							value={Utils.formatPrice(cartDataSubtotal, settings.currency)}
						/>
						{isCouponApplied && (
							<Row
								label="Discount"
								value={`- ${Utils.formatPrice(discount, settings.currency)}`}
							/>
						)}
						<Row
							label="Shipping"
							value={
								shippingCost === 0
									? 'Free'
									: Utils.formatPrice(shippingCost, settings.currency)
							}
						/>
						<div className="flex justify-between border-t border-border pt-3 font-serif text-xl">
							<span>Total</span>
							<span className="text-primary">
								{Utils.formatPrice(total, settings.currency)}
							</span>
						</div>
					</div>

					<Link
						to="/checkout"
						className="mt-6 block bg-gradient-gold py-3.5 text-center text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
					>
						Proceed to Checkout
					</Link>
					<p className="mt-3 text-center text-xs text-muted-foreground">
						Try code <span className="text-primary">ANSYLA2026</span> for 10% off
					</p>
				</aside>
			</div>
		</div>
	)
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between text-muted-foreground">
			<span>{label}</span>
			<span className="text-foreground">{value}</span>
		</div>
	)
}

export default Cart
