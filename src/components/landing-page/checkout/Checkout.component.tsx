import FieldLabel from '@/components/field-label/FieldLabel.component'
import type { CheckoutForm } from '@/containers/landing-page/checkout/Checkout.container'
import type { CartItem } from '@/redux/types/Cart.type'
import type { OrderItem } from '@/redux/types/Order.type'
import type { SettingsBankDetails } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'
import { Check, Lock, ShieldCheck } from 'lucide-react'
import type React from 'react'
import { Link } from 'react-router'

const provinces = [
	'Gauteng',
	'Western Cape',
	'KwaZulu-Natal',
	'Eastern Cape',
	'Free State',
	'Limpopo',
	'Mpumalanga',
	'North West',
	'Northern Cape',
]

const payMethods = [
	{ name: 'Manual EFT', enabled: true },
	{ name: 'PayFast', enabled: false },
	{ name: 'Ozow Instant EFT', enabled: false },
	{ name: 'Yoco', enabled: false },
	{ name: 'Peach Payments', enabled: false },
	{ name: 'Visa / Mastercard', enabled: false },
]

function Checkout({
	cartData,
	isLoggedIn,
	selectedAddressId,
	form,
	saveAddress,
	setAsDefaultAddress,
	deliveryMethod,
	paymentMethod,
	subtotal,
	shippingCost,
	freeShipping,
	couponDiscount,
	availablePoints,
	maxRedeemablePoints,
	pointsToRedeem,
	pointsDiscount,
	pointsBelowMinimum,
	minPointsRedemption,
	randPerPoint,
	isCouponApplied,
	total,
	currency,
	outOfStockItems,
	placingOrder,
	placedOrder,
	bankDetails,
	onFormChange,
	onSaveAddressChange,
	onSetAsDefaultAddressChange,
	onDeliveryMethodChange,
	onPaymentMethodChange,
	onPlaceOrderClick,
	onPointsToRedeemChange,
}: {
	cartData: CartItem[]
	isLoggedIn: boolean
	selectedAddressId: string
	form: CheckoutForm
	saveAddress: boolean
	setAsDefaultAddress: boolean
	deliveryMethod: 'standard' | 'express'
	paymentMethod: string
	subtotal: number
	shippingCost: number
	freeShipping: boolean
	couponDiscount: number
	availablePoints: number
	maxRedeemablePoints: number
	pointsToRedeem: number
	pointsDiscount: number
	pointsBelowMinimum: boolean
	minPointsRedemption: number
	randPerPoint: number
	isCouponApplied: boolean
	total: number
	currency: string | undefined
	outOfStockItems: CartItem[]
	placingOrder: boolean
	placedOrder: OrderItem | null
	bankDetails: SettingsBankDetails | undefined
	onFormChange: (value: Partial<CheckoutForm>) => void
	onSelectedAddressChange: (addressId: string) => void
	onSaveAddressChange: (value: boolean) => void
	onSetAsDefaultAddressChange: (value: boolean) => void
	onDeliveryMethodChange: (value: 'standard' | 'express') => void
	onPaymentMethodChange: (value: string) => void
	onPlaceOrderClick: (event: React.FormEvent) => void
	onPointsToRedeemChange: (value: number) => void
}) {
	if (placedOrder) {
		return (
			<div className="mx-auto max-w-xl px-6 py-32 text-center">
				<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold">
					<Check className="h-8 w-8 text-primary-foreground" />
				</div>
				<h1 className="mt-6 font-serif text-4xl">Thank You</h1>
				<p className="mt-3 text-muted-foreground">
					Your ANSYLA order <span className="text-primary">{placedOrder.order_no}</span>{' '}
					has been placed. A confirmation will arrive at {placedOrder.customer_email}{' '}
					shortly.
				</p>

				{placedOrder.payment_method === 'Manual EFT' &&
					placedOrder.payment_status === 'Pending Payment' && (
						<div className="mx-auto mt-8 max-w-sm border border-primary/30 bg-card p-6 text-left shadow-gold">
							<p className="font-serif text-lg">Complete Your Payment</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Please make an EFT payment for{' '}
								<span className="text-primary">
									{Utils.formatPrice(placedOrder.total)}
								</span>{' '}
								to the account below, using{' '}
								<span className="text-primary">
									{placedOrder.payment_reference}
								</span>{' '}
								as your payment reference. Your order will be marked as paid once
								we've confirmed the funds.
							</p>
							<div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
								<BankDetailRow label="Bank" value={bankDetails?.bank_name} />
								<BankDetailRow
									label="Account Holder"
									value={bankDetails?.account_holder}
								/>
								<BankDetailRow
									label="Account Number"
									value={bankDetails?.account_number}
								/>
								<BankDetailRow
									label="Branch Code"
									value={bankDetails?.branch_code}
								/>
								<BankDetailRow
									label="Account Type"
									value={bankDetails?.account_type}
								/>
								<BankDetailRow
									label="Reference"
									value={placedOrder.payment_reference}
								/>
							</div>
						</div>
					)}

				<Link
					to="/shop"
					className="mt-8 inline-block bg-gradient-gold px-8 py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
				>
					Continue Shopping
				</Link>
			</div>
		)
	}

	if (cartData.length === 0) {
		return (
			<div className="mx-auto max-w-2xl px-6 py-32 text-center">
				<h1 className="font-serif text-4xl">Your cart is empty</h1>
				<Link to="/shop" className="mt-6 inline-block text-primary underline">
					Shop the collection
				</Link>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<div className="mb-10 flex items-center gap-3">
				<Lock className="h-5 w-5 text-primary" />
				<h1 className="font-serif text-4xl sm:text-5xl">Secure Checkout</h1>
			</div>

			<form onSubmit={onPlaceOrderClick} className="grid gap-12 lg:grid-cols-[1fr_380px]">
				<div className="space-y-10">
					<section>
						<h2 className="mb-5 font-serif text-2xl">Customer Information</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							<FieldLabel
								label="Full Name"
								value={form.fullName}
								onChange={v => onFormChange({ fullName: v })}
							/>
							<FieldLabel
								label="Email Address"
								type="email"
								value={form.email}
								onChange={v => onFormChange({ email: v })}
							/>
							<FieldLabel
								label="Mobile Number"
								type="tel"
								value={form.phone}
								onChange={v => onFormChange({ phone: v })}
							/>
						</div>
					</section>

					<section>
						<h2 className="mb-5 font-serif text-2xl">Shipping Address</h2>

						{isLoggedIn && availablePoints > 0 && (
							<div className="border-b border-border pb-5 text-sm">
								<p className="text-muted-foreground">
									You have <span className="text-primary">{availablePoints}</span>{' '}
									points available (worth{' '}
									{Utils.formatPrice(availablePoints * randPerPoint, currency)}).
								</p>

								<div className="mt-3">
									<input
										type="range"
										min={0}
										max={maxRedeemablePoints}
										step={1}
										value={pointsToRedeem}
										onChange={e =>
											onPointsToRedeemChange(Number(e.target.value))
										}
										disabled={maxRedeemablePoints === 0}
										className="w-full accent-[var(--gold)] disabled:opacity-50"
									/>
									<div className="mt-1.5 flex items-center justify-between text-muted-foreground">
										<span>
											Redeeming{' '}
											<span className="text-primary">{pointsToRedeem}</span>{' '}
											points
										</span>
										{pointsDiscount > 0 && (
											<span className="text-primary">
												- {Utils.formatPrice(pointsDiscount, currency)}
											</span>
										)}
									</div>
								</div>

								{pointsBelowMinimum && (
									<p className="mt-1.5 text-xs text-destructive">
										Redeem at least {minPointsRedemption} points, or 0.
									</p>
								)}
							</div>
						)}

						{selectedAddressId === 'new' && (
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="sm:col-span-2">
									<FieldLabel
										label="Street Address"
										value={form.line1}
										onChange={v => onFormChange({ line1: v })}
									/>
								</div>
								<FieldLabel
									label="City"
									value={form.city}
									onChange={v => onFormChange({ city: v })}
								/>
								<FieldLabel
									label="Postal Code"
									value={form.postalCode}
									onChange={v => onFormChange({ postalCode: v })}
								/>
								<label className="block sm:col-span-2">
									<span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
										Province
									</span>
									<select
										required
										value={form.province}
										onChange={e => onFormChange({ province: e.target.value })}
										className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
									>
										{provinces.map(p => (
											<option key={p}>{p}</option>
										))}
									</select>
								</label>

								{isLoggedIn && (
									<div className="flex flex-col gap-2 text-sm text-muted-foreground sm:col-span-2">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={saveAddress}
												onChange={e =>
													onSaveAddressChange(e.target.checked)
												}
												className="h-4 w-4 accent-primary"
											/>
											Save this address to my account
										</label>
										{saveAddress && (
											<label className="flex items-center gap-2 pl-6">
												<input
													type="checkbox"
													checked={setAsDefaultAddress}
													onChange={e =>
														onSetAsDefaultAddressChange(
															e.target.checked
														)
													}
													className="h-4 w-4 accent-primary"
												/>
												Set as default address
											</label>
										)}
									</div>
								)}
							</div>
						)}
					</section>

					<section>
						<h2 className="mb-5 font-serif text-2xl">Delivery</h2>
						<div className="grid gap-3 sm:grid-cols-2">
							<DeliveryOption
								active={deliveryMethod === 'standard'}
								onClick={() => onDeliveryMethodChange('standard')}
								title="Standard Delivery"
								desc="3–5 business days"
								price={
									freeShipping
										? 'Free'
										: Utils.formatPrice(shippingCost, currency)
								}
							/>
							<DeliveryOption
								active={deliveryMethod === 'express'}
								onClick={() => onDeliveryMethodChange('express')}
								title="Express Delivery"
								desc="1–2 business days"
								price={
									freeShipping
										? 'Free'
										: Utils.formatPrice(shippingCost + 100, currency)
								}
							/>
						</div>
						{freeShipping && (
							<p className="mt-3 text-xs text-primary">
								✦ You qualify for complimentary shipping.
							</p>
						)}
					</section>

					<section>
						<h2 className="mb-5 font-serif text-2xl">Payment Method</h2>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{payMethods.map(method => (
								<button
									type="button"
									key={method.name}
									onClick={() =>
										method.enabled && onPaymentMethodChange(method.name)
									}
									disabled={!method.enabled}
									className={`border px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
										paymentMethod === method.name
											? 'border-primary text-primary'
											: 'border-border text-muted-foreground hover:border-primary/50'
									}`}
								>
									{method.name}
									{!method.enabled && (
										<span className="block text-[10px] uppercase tracking-wider">
											Coming Soon
										</span>
									)}
								</button>
							))}
						</div>

						{paymentMethod === 'Manual EFT' && (
							<div className="mt-4 space-y-1 border border-primary/30 bg-card p-4 text-sm">
								<p className="mb-2 text-xs uppercase tracking-wider text-primary">
									Pay via EFT using these details
								</p>
								<BankDetailRow label="Bank" value={bankDetails?.bank_name} />
								<BankDetailRow
									label="Account Holder"
									value={bankDetails?.account_holder}
								/>
								<BankDetailRow
									label="Account Number"
									value={bankDetails?.account_number}
								/>
								<BankDetailRow
									label="Branch Code"
									value={bankDetails?.branch_code}
								/>
								<BankDetailRow
									label="Account Type"
									value={bankDetails?.account_type}
								/>
								<p className="mt-2 text-xs text-muted-foreground">
									Your unique payment reference will be shown once your order is
									placed.
								</p>
							</div>
						)}
					</section>
				</div>

				<aside className="h-fit border border-border bg-card p-6">
					<h2 className="font-serif text-2xl">Your Order</h2>
					<div className="mt-5 space-y-4 border-b border-border pb-5">
						{cartData.map(({ product, quantity }) => {
							const outOfStock = outOfStockItems.some(
								item => item.product.id === product.id
							)

							return (
								<div key={product.id} className="flex gap-3">
									<img
										src={product.images?.[0]?.url}
										alt={product.name}
										className="h-16 w-16 rounded-sm border border-border object-cover"
									/>
									<div className="flex-1 text-sm">
										<p className="font-serif">{product.name}</p>
										<p className="text-muted-foreground">Qty {quantity}</p>
										{outOfStock && (
											<p className="text-xs text-destructive">
												Not enough stock available
											</p>
										)}
									</div>
									<p className="text-sm text-primary">
										{Utils.formatPrice(product.price * quantity, currency)}
									</p>
								</div>
							)
						})}
					</div>
					<div className="mt-5 space-y-2 text-sm">
						<div className="flex justify-between text-muted-foreground">
							<span>Subtotal</span>
							<span className="text-foreground">
								{Utils.formatPrice(subtotal, currency)}
							</span>
						</div>
						{isCouponApplied && (
							<div className="flex justify-between text-muted-foreground">
								<span>Coupon Discount</span>
								<span className="text-foreground">
									- {Utils.formatPrice(couponDiscount, currency)}
								</span>
							</div>
						)}
						{pointsDiscount > 0 && (
							<div className="flex justify-between text-muted-foreground">
								<span>Points Discount</span>
								<span className="text-foreground">
									- {Utils.formatPrice(pointsDiscount, currency)}
								</span>
							</div>
						)}
						<div className="flex justify-between text-muted-foreground">
							<span>Shipping</span>
							<span className="text-foreground">
								{shippingCost === 0
									? 'Free'
									: Utils.formatPrice(shippingCost, currency)}
							</span>
						</div>
						<div className="flex justify-between border-t border-border pt-3 font-serif text-xl">
							<span>Total</span>
							<span className="text-primary">
								{Utils.formatPrice(total, currency)}
							</span>
						</div>
					</div>

					<button
						disabled={placingOrder || outOfStockItems.length > 0 || pointsBelowMinimum}
						className="mt-6 w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 "
					>
						{placingOrder
							? 'Placing Order…'
							: `Place Order · ${Utils.formatPrice(total, currency)}`}
					</button>
					<p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
						<ShieldCheck className="h-4 w-4 text-primary" />
						256-bit SSL secured checkout
					</p>
				</aside>
			</form>
		</div>
	)
}

function DeliveryOption({
	active,
	onClick,
	title,
	desc,
	price,
}: {
	active: boolean
	onClick: () => void
	title: string
	desc: string
	price: string
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex flex-col items-start border p-4 text-left transition-colors ${
				active ? 'border-primary' : 'border-border hover:border-primary/50'
			}`}
		>
			<span className="font-serif text-lg">{title}</span>
			<span className="text-xs text-muted-foreground">{desc}</span>
			<span className="mt-2 text-sm text-primary">{price}</span>
		</button>
	)
}

function BankDetailRow({ label, value }: { label: string; value: string | null | undefined }) {
	return (
		<div className="flex justify-between">
			<span className="text-muted-foreground">{label}</span>
			<span>{value || '—'}</span>
		</div>
	)
}

export default Checkout
