import { Stat } from '@/containers/landing-page/dashboard/account/overview/Overview.helper'
import { Utils } from '@/utils/Utils'
import { Award } from 'lucide-react'

// TODO - REMOVE / MOVE THIS INTERFACE FROM COMPONENT
export interface CustomerProfile {
	name: string
	email: string
	phone: string
	memberSince: string
	tier: 'Silver' | 'Gold' | 'Platinum'
	points: number
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderItem {
	productId: string
	name: string
	price: number
	quantity: number
}

export interface Order {
	id: string
	date: string
	status: OrderStatus
	items: OrderItem[]
	total: number
	customerName: string
	customerEmail: string
}

// TODO - REMOVE THIS HARDCODED MOCK DATA FROM COMPONENT
export const mockProfile: CustomerProfile = {
	name: 'Amara Nkosi',
	email: 'amara@example.co.za',
	phone: '+27 82 123 4567',
	memberSince: 'March 2024',
	tier: 'Gold',
	points: 1250,
}

export const myOrders: Order[] = [
	{
		id: 'ANS-10248',
		date: '2025-05-12',
		status: 'Delivered',
		customerName: 'Amara Nkosi',
		customerEmail: 'amara@example.co.za',
		items: [
			{
				productId: 'aurora-solitaire-ring',
				name: 'Aurora Solitaire Ring',
				price: 18999,
				quantity: 1,
			},
		],
		total: 18999,
	},
	{
		id: 'ANS-10311',
		date: '2025-05-24',
		status: 'Shipped',
		customerName: 'Amara Nkosi',
		customerEmail: 'amara@example.co.za',
		items: [
			{
				productId: 'lumiere-drop-earrings',
				name: 'Lumière Drop Earrings',
				price: 15750,
				quantity: 1,
			},
			{
				productId: 'halo-stacking-band',
				name: 'Halo Stacking Band Set',
				price: 7499,
				quantity: 1,
			},
		],
		total: 23249,
	},
	{
		id: 'ANS-10355',
		date: '2025-05-30',
		status: 'Processing',
		customerName: 'Amara Nkosi',
		customerEmail: 'amara@example.co.za',
		items: [
			{
				productId: 'celeste-teardrop-necklace',
				name: 'Celeste Teardrop Necklace',
				price: 12499,
				quantity: 1,
			},
		],
		total: 12499,
	},
]

function Overview() {
	const totalSpent = myOrders.reduce((s, o) => s + o.total, 0)

	return (
		<div className="space-y-6">
			<div className="border border-primary/30 bg-card p-6 shadow-gold">
				<div className="flex items-center gap-3">
					<Award className="h-7 w-7 text-primary" />
					<div>
						<p className="font-serif text-2xl">ANSYLA Rewards</p>
						<p className="text-xs uppercase tracking-wider text-primary">
							{mockProfile.tier} Member
						</p>
					</div>
				</div>
				<div className="mt-5">
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>{mockProfile.points.toLocaleString()} pts</span>
						<span>Platinum at 2 000</span>
					</div>
					<div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
						<div
							className="h-full bg-gradient-gold"
							style={{ width: `${(mockProfile.points / 2000) * 100}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<Stat label="Orders" value={String(myOrders.length)} />
				<Stat label="Total Spent" value={Utils.formatPrice(totalSpent)} />
				<Stat label="Member Since" value={mockProfile.memberSince} />
			</div>

			<button
				onClick={() => {}}
				className="w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
			>
				View Order History
			</button>
		</div>
	)
}

export default Overview
