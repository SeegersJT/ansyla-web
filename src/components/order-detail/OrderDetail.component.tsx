import type { OrderItem } from '@/redux/types/Order.type'
import { Utils } from '@/utils/Utils'
import { X } from 'lucide-react'
import type React from 'react'

const paymentStatusStyles: Record<string, string> = {
	Paid: 'border-green-500/40 text-green-500',
	'Pending Payment': 'border-yellow-500/40 text-yellow-500',
}

function OrderDetail({
	order,
	onClose,
	actions,
}: {
	order: OrderItem
	onClose: () => void
	actions?: React.ReactNode
}) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
			<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6">
				<div className="flex items-start justify-between border-b border-border pb-4">
					<div>
						<h3 className="font-serif text-2xl">{order.order_no ?? order.id}</h3>
						<p className="mt-1 text-xs text-muted-foreground">
							Placed {String(order.createdAt)}
						</p>
					</div>
					<button onClick={onClose} aria-label="Close">
						<X className="h-5 w-5 text-muted-foreground hover:text-foreground hover:cursor-pointer" />
					</button>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					<span className="border border-primary/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
						{order.status}
					</span>
					<span
						className={`border px-3 py-1 text-[10px] uppercase tracking-wider ${
							paymentStatusStyles[order.payment_status] ??
							'border-border text-muted-foreground'
						}`}
					>
						{order.payment_status}
					</span>
					<span className="border border-border px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
						{order.payment_method}
					</span>
				</div>

				<div className="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<h4 className="text-xs uppercase tracking-wider text-muted-foreground">
							Customer
						</h4>
						<p className="mt-2 text-sm">{order.customer_name}</p>
						<p className="text-sm text-muted-foreground">{order.customer_email}</p>
					</div>
					<div>
						<h4 className="text-xs uppercase tracking-wider text-muted-foreground">
							Shipping Address
						</h4>
						<p className="mt-2 text-sm">{order.shipping_address.full_name}</p>
						<p className="text-sm text-muted-foreground">
							{order.shipping_address.line1}
						</p>
						<p className="text-sm text-muted-foreground">
							{order.shipping_address.city}, {order.shipping_address.province}{' '}
							{order.shipping_address.postal_code}
						</p>
						<p className="text-sm text-muted-foreground">
							{order.shipping_address.phone_number}
						</p>
					</div>
				</div>

				<div className="mt-6">
					<h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
						Items
					</h4>
					<div className="space-y-3">
						{order.items.map((item, index) => (
							<div key={`${item.product_id}-${index}`} className="flex gap-3">
								{item.image && (
									<img
										src={item.image}
										alt={item.name}
										className="h-14 w-14 rounded-sm border border-border object-cover"
									/>
								)}
								<div className="flex-1 text-sm">
									<p>{item.name}</p>
									<p className="text-muted-foreground">Qty {item.quantity}</p>
								</div>
								<p className="text-sm text-primary">
									{Utils.formatPrice(item.price * item.quantity)}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
					<div className="flex justify-between text-muted-foreground">
						<span>Subtotal</span>
						<span className="text-foreground">{Utils.formatPrice(order.subtotal)}</span>
					</div>
					{order.discount > 0 && (
						<div className="flex justify-between text-muted-foreground">
							<span>Discount</span>
							<span className="text-foreground">
								- {Utils.formatPrice(order.discount)}
							</span>
						</div>
					)}
					<div className="flex justify-between text-muted-foreground">
						<span>Shipping</span>
						<span className="text-foreground">
							{order.shipping_cost === 0
								? 'Free'
								: Utils.formatPrice(order.shipping_cost)}
						</span>
					</div>
					<div className="flex justify-between border-t border-border pt-3 font-serif text-xl">
						<span>Total</span>
						<span className="text-primary">{Utils.formatPrice(order.total)}</span>
					</div>
				</div>

				{actions && <div className="mt-6 border-t border-border pt-4">{actions}</div>}
			</div>
		</div>
	)
}

export default OrderDetail
