import type { LucideIcon } from 'lucide-react'
import { Boxes, LayoutDashboard, ShoppingBag, SlidersHorizontal, Tag, Users } from 'lucide-react'

export interface AdminTabItem {
	path: string
	label: string
	icon: LucideIcon
}

export const adminTabs: AdminTabItem[] = [
	{ path: 'overview', label: 'Overview', icon: LayoutDashboard },
	{ path: 'stock', label: 'Stock', icon: Boxes },
	{ path: 'categories', label: 'Categories', icon: Tag },
	{ path: 'orders', label: 'Orders', icon: ShoppingBag },
	{ path: 'customers', label: 'Customers', icon: Users },
	{ path: 'settings', label: 'Settings', icon: SlidersHorizontal },
]
