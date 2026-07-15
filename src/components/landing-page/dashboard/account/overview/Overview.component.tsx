import { Stat } from '@/containers/landing-page/dashboard/account/overview/Overview.helper'
import type { AuthUserDetails } from '@/redux/types/Authentication.type'
import { CANCELLED_ORDER_STATUS, type OrderItem } from '@/redux/types/Order.type'
import type { LoyaltyResult } from '@/utils/Utils.type'
import { Utils } from '@/utils/Utils'
import { Award } from 'lucide-react'
import { Link } from 'react-router'

function Overview({
	userDetails,
	orders,
	ordersLoading,
	orderCount,
	totalSpent,
	loyalty,
	currency,
}: {
	userDetails: AuthUserDetails | null
	orders: OrderItem[]
	ordersLoading: boolean
	orderCount: number
	totalSpent: number
	loyalty: LoyaltyResult
	currency: string | undefined
}) {
	const recentOrders = [...orders]
		.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
		.slice(0, 3)

	const memberSince = userDetails?.createdAt ? String(userDetails.createdAt).split(' ')[0] : '—'

	return (
		<div className="space-y-6">
			<div className="border border-primary/30 bg-card p-6 shadow-gold">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<Award className="h-7 w-7 text-primary" />
						<div>
							<p className="font-serif text-2xl">ANSYLA Rewards</p>
							<p className="text-xs uppercase tracking-wider text-primary">
								{loyalty.tier} Member
							</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-serif text-2xl text-primary">{loyalty.points}</p>
						<p className="text-xs uppercase tracking-wider text-muted-foreground">
							Points
						</p>
					</div>
				</div>

				{loyalty.nextTier && (
					<p className="mt-4 text-xs text-muted-foreground">
						{Utils.formatPrice(loyalty.amountToNextTier, currency)} away from{' '}
						<span className="text-primary">{loyalty.nextTier.tier}</span>
					</p>
				)}
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<Stat label="Orders" value={String(orderCount)} />
				<Stat label="Total Spent" value={Utils.formatPrice(totalSpent, currency)} />
				<Stat label="Member Since" value={memberSince} />
			</div>

			<div className="border border-border bg-card p-6">
				<h3 className="font-serif text-xl">Recent Orders</h3>
				{ordersLoading ? (
					<p className="mt-3 text-sm text-muted-foreground">Loading orders…</p>
				) : recentOrders.length === 0 ? (
					<p className="mt-3 text-sm text-muted-foreground">
						You haven't placed any orders yet.
					</p>
				) : (
					<ul className="mt-4 space-y-4">
						{recentOrders.map(order => {
							const itemCount = order.items.reduce(
								(total, item) => total + item.quantity,
								0
							)
							const itemsSummary =
								order.items.length === 0
									? ''
									: order.items.length === 1
										? order.items[0].name
										: `${order.items[0].name} +${order.items.length - 1} more`

							return (
								<Link
									key={order.id}
									to="../orders"
									className="block border-b border-border pb-4 transition-opacity last:border-0 last:pb-0 hover:opacity-70"
								>
									<div className="flex items-center justify-between gap-3 text-sm">
										<span className="font-serif">
											{order.order_no ?? order.id}
										</span>
										<span className="text-primary">
											{Utils.formatPrice(order.total, currency)}
										</span>
									</div>
									<p className="mt-1 truncate text-sm text-muted-foreground">
										{itemsSummary}
									</p>
									<div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
										<span>
											{String(order.createdAt).split(' ')[0]} · {itemCount}{' '}
											{itemCount === 1 ? 'item' : 'items'}
										</span>
										<span
											className={`border px-2 py-0.5 uppercase tracking-wider ${
												order.status === CANCELLED_ORDER_STATUS
													? 'border-destructive/40 text-destructive'
													: 'border-primary/40 text-primary'
											}`}
										>
											{order.status}
										</span>
									</div>
								</Link>
							)
						})}
					</ul>
				)}
			</div>

			<Link
				to="../orders"
				className="block w-full bg-gradient-gold py-3.5 text-center text-xs font-medium uppercase tracking-luxe text-primary-foreground"
			>
				View Order History
			</Link>
		</div>
	)
}

export default Overview
