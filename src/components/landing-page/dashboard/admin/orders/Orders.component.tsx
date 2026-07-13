import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import type { OrderItem } from '@/redux/types/Order.type'
import type { OrderStatus } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'

function Orders({
	orders,
	loading,
	statusOptions,
	onStatusChange,
}: {
	orders: OrderItem[]
	loading: boolean
	statusOptions: OrderStatus[]
	onStatusChange: (id: string, status: string) => void
}) {
	const findStatusNo = (status: string) =>
		statusOptions.find(option => option.status === status)?.status_no ?? 0

	const sortedStatusOptions = [...statusOptions].sort(
		(a, b) => (a.status_no ?? 0) - (b.status_no ?? 0)
	)

	const columns: Column<OrderItem>[] = [
		{ key: 'order_no', header: 'Order', accessor: order => order.order_no ?? order.id },
		{
			key: 'customer',
			header: 'Customer',
			render: order => (
				<div>
					<div>{order.customer_name}</div>
					<div className="text-xs text-muted-foreground">{order.customer_email}</div>
				</div>
			),
		},
		{ key: 'total', header: 'Total', accessor: order => Utils.formatPrice(order.total) },
		{
			key: 'status',
			header: 'Status',
			render: order => (
				<select
					value={order.status}
					onChange={e => onStatusChange(order.id, e.target.value)}
					className={`border bg-background px-3 py-1.5 text-[10px] uppercase tracking-wider outline-none ${Utils.getOrderStatusStyle(findStatusNo(order.status))}`}
				>
					{sortedStatusOptions.length === 0 ? (
						<option value={order.status}>{order.status}</option>
					) : (
						sortedStatusOptions.map(option => (
							<option key={option.status} value={option.status ?? ''}>
								{option.status}
							</option>
						))
					)}
				</select>
			),
		},
	]

	return (
		<div className="space-y-4">
			<h2 className="font-serif text-2xl">Customer Orders</h2>
			<DataTable
				columns={columns}
				data={orders}
				emptyMessage={loading ? 'Loading orders…' : 'No orders yet.'}
			/>
		</div>
	)
}

export default Orders
