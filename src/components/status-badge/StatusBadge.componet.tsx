import { Utils } from '@/utils/Utils'
import type { OrderStatusValue } from '@/redux/types/Order.type'

export const orderStatusStyles: Record<OrderStatusValue, string> = {
	Processing: 'border-yellow-500/40 text-yellow-500',
	Shipped: 'border-primary/40 text-primary',
	Delivered: 'border-green-500/40 text-green-500',
	Cancelled: 'border-destructive/40 text-destructive',
}

function StatusBadge({ status, statusNo }: { status: string; statusNo?: number | null }) {
	return (
		<span
			className={`inline-block border px-3 py-1 text-[10px] uppercase tracking-wider ${Utils.getOrderStatusStyle(statusNo)}`}
		>
			{status}
		</span>
	)
}

export default StatusBadge
