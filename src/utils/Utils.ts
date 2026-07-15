import { Timestamp } from 'firebase/firestore'
import type { LoyaltyResult, StockAvailabilityItem } from './Utils.type'
import type { OrderStatus, Settings } from '@/redux/types/Settings.type'
import { CANCELLED_ORDER_STATUS } from '@/redux/types/Order.type'

export class Utils {
	static convertTimestamps<T extends Record<string, unknown>>(obj: T): T {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => {
				if (value instanceof Timestamp) {
					return [key, Utils.formatDate(value.toDate())]
				}
				return [key, value]
			})
		) as T
	}

	static formatDate(date: Date): string {
		const pad = (n: number) => String(n).padStart(2, '0')
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
	}

	static formatDateReadable(date: Date, options?: Intl.DateTimeFormatOptions): string {
		return new Intl.DateTimeFormat('en-ZA', { ...options }).format(date)
	}

	static formatPrice(amount: number, currency: string = 'ZAR'): string {
		return new Intl.NumberFormat('en-ZA', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount)
	}

	static calculateStockAvailability(quantity: number | null | undefined): StockAvailabilityItem {
		if (quantity == null || quantity == undefined) {
			return { label: 'Information Unavailable', icon: 'none', variant: 'destructive' }
		}

		if (quantity <= 0) {
			return { label: 'No Stock', icon: 'none', variant: 'destructive' }
		}

		if (quantity < 10) {
			return { label: `Only ${quantity} left`, icon: 'warning', variant: 'warning' }
		}

		return { label: 'In Stock', icon: 'check', variant: 'success' }
	}

	static fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
			reader.readAsDataURL(file)
		})
	}

	static generateIdentifier(
		prefix: string | null | undefined,
		sequence: number | null | undefined
	): string {
		const paddedSequence = String(sequence ?? 0).padStart(5, '0')
		return prefix ? `${prefix}-${paddedSequence}` : paddedSequence
	}

	private static readonly STATUS_COLOR_PALETTE = [
		'border-yellow-500/40 text-yellow-500',
		'border-primary/40 text-primary',
		'border-green-500/40 text-green-500',
		'border-destructive/40 text-destructive',
		'border-blue-500/40 text-blue-500',
		'border-purple-500/40 text-purple-500',
	]

	static getOrderStatusStyle(statusNo: number | null | undefined): string {
		const index = Math.abs(statusNo ?? 0) % Utils.STATUS_COLOR_PALETTE.length
		return Utils.STATUS_COLOR_PALETTE[index]
	}

	static isOrderCancellable(
		status: string,
		statusOptions: OrderStatus[],
		actor: 'admin' | 'customer'
	): boolean {
		if (status === CANCELLED_ORDER_STATUS) return false
		if (!statusOptions || statusOptions.length === 0) return true

		const sorted = [...statusOptions].sort((a, b) => (a.status_no ?? 0) - (b.status_no ?? 0))

		if (actor === 'admin') {
			const finalStatus = sorted[sorted.length - 1]?.status
			return status !== finalStatus
		}

		const firstStatus = sorted[0]?.status
		return status === firstStatus
	}

	static calculateLoyalty(totalSpent: number, settings: Settings | undefined): LoyaltyResult {
		const tiers = [...(settings?.loyaltyTiers ?? [])].sort(
			(a, b) => (a.min_spend ?? 0) - (b.min_spend ?? 0)
		)

		const currentTier =
			[...tiers].reverse().find(t => totalSpent >= (t.min_spend ?? 0))?.tier ??
			tiers[0]?.tier ??
			'Member'

		const nextTier = tiers.find(t => (t.min_spend ?? 0) > totalSpent) ?? null
		const amountToNextTier = nextTier ? Math.max(0, (nextTier.min_spend ?? 0) - totalSpent) : 0

		const pointsRate = (settings?.points_per_100_spent ?? 0) / 100
		const points = Math.floor(totalSpent * pointsRate)

		return { tier: currentTier, points, nextTier, amountToNextTier }
	}

	static isPaidOrder(order: { payment_status: string; status: string }): boolean {
		return order.payment_status === 'Paid' && order.status !== CANCELLED_ORDER_STATUS
	}

	static getAvailablePoints(
		loyalty: LoyaltyResult,
		pointsRedeemed: number | null | undefined
	): number {
		return Math.max(0, loyalty.points - (pointsRedeemed ?? 0))
	}

	static calculatePointsDiscount(pointsToRedeem: number, settings: Settings | undefined): number {
		return Math.max(0, pointsToRedeem) * (settings?.rand_per_point ?? 0)
	}
}
