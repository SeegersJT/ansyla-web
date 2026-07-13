import { Timestamp } from 'firebase/firestore'
import type { StockAvailabilityItem } from './Utils.type'

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
		if (!quantity) {
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
}
