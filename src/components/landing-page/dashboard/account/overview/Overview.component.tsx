import { Stat } from '@/containers/landing-page/dashboard/account/overview/Overview.helper'
import type { AuthUserDetails } from '@/redux/types/Authentication.type'
import type { OrderItem } from '@/redux/types/Order.type'
import { Utils } from '@/utils/Utils'
import { Award } from 'lucide-react'
import { Link } from 'react-router'

function Overview({
	userDetails,
	orders,
	ordersLoading,
	orderCount,
	totalSpent,
}: {
	userDetails: AuthUserDetails | null
	orders: OrderItem[]
	ordersLoading: boolean
	orderCount: number
	totalSpent: number
}) {
	const recentOrders = [...orders]
		.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
		.slice(0, 3)

	const memberSince = userDetails?.createdAt ? String(userDetails.createdAt).split(' ')[0] : '—'

	return (
		<div className="space-y-6">
			<div className="border border-primary/30 bg-card p-6 shadow-gold">
				<div className="flex items-center gap-3">
					<Award className="h-7 w-7 text-primary" />
					<div>
						<p className="font-serif text-2xl">ANSYLA Rewards</p>
						<p className="text-xs uppercase tracking-wider text-primary">
							{userDetails?.tier ?? 'Silver'} Member
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<Stat label="Orders" value={String(orderCount)} />
				<Stat label="Total Spent" value={Utils.formatPrice(totalSpent)} />
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
					<ul className="mt-4 space-y-3">
						{recentOrders.map(order => (
							<li
								key={order.id}
								className="flex items-center justify-between text-sm"
							>
								<span>{order.order_no ?? order.id}</span>
								<span className="text-primary">
									{Utils.formatPrice(order.total)}
								</span>
							</li>
						))}
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
