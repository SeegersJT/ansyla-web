import type { LoyaltyTier } from '@/redux/types/Settings.type'

type StockVariant = 'success' | 'warning' | 'destructive'
type StockIcon = 'check' | 'warning' | 'none'

export interface StockAvailabilityItem {
	label: string
	icon: StockIcon
	variant: StockVariant
}

export interface LoyaltyResult {
	tier: string
	points: number
	nextTier: LoyaltyTier | null
	amountToNextTier: number
}
