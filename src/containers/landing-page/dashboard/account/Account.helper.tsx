import { Heart, LayoutDashboard, MapPin, ShoppingBag, User } from 'lucide-react'

export const accountTabs = [
	{ path: 'overview', label: 'Overview', icon: LayoutDashboard },
	{ path: 'orders', label: 'Orders', icon: ShoppingBag },
	{ path: 'wishlist', label: 'Wishlist', icon: Heart },
	{ path: 'addresses', label: 'Addresses', icon: MapPin },
	{ path: 'profile', label: 'Profile', icon: User },
]
