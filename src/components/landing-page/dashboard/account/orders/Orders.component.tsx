import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import OrderDetail from '@/components/order-detail/OrderDetail.component'
import type { OrderItem } from '@/redux/types/Order.type'
import { Utils } from '@/utils/Utils'
import { Eye, Package } from 'lucide-react'
import { Link } from 'react-router'

function Orders({
	orders,
	loading,
	selectedOrder,
	onViewOrderClick,
	onCloseDetailClick,
}: {
	orders: OrderItem[]
	loading: boolean
	selectedOrder: OrderItem | null
	onViewOrderClick: (order: OrderItem) => void
	onCloseDetailClick: () => void
}) {
	if (!loading && orders.length === 0) {
		return (
			<div className="flex flex-col items-center gap-4 border border-border bg-card py-20 text-center">
				<Package className="h-10 w-10 text-primary/40" />
				<p className="text-muted-foreground">You haven't placed any orders yet.</p>
				<Link
					to="/shop"
					className="bg-gradient-gold px-6 py-3 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
				>
					Discover Pieces
				</Link>
			</div>
		)
	}

	const columns: Column<OrderItem>[] = [
		{ key: 'order_no', header: 'Order', accessor: order => order.order_no ?? order.id },
		{
			key: 'createdAt',
			header: 'Date',
			accessor: order => String(order.createdAt),
		},
		{ key: 'total', header: 'Total', accessor: order => Utils.formatPrice(order.total) },
		{
			key: 'status',
			header: 'Status',
			render: order => (
				<span className="border border-primary/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
					{order.status}
				</span>
			),
		},
		{
			key: 'payment_status',
			header: 'Payment',
			render: order => (
				<span
					className={`border px-3 py-1 text-[10px] uppercase tracking-wider ${
						order.payment_status === 'Paid'
							? 'border-green-500/40 text-green-500'
							: 'border-yellow-500/40 text-yellow-500'
					}`}
				>
					{order.payment_status}
				</span>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			align: 'right',
			render: order => (
				<button
					onClick={() => onViewOrderClick(order)}
					className="border border-border p-2 hover:border-primary hover:text-primary hover:cursor-pointer"
					aria-label="View order"
				>
					<Eye className="h-3.5 w-3.5" />
				</button>
			),
		},
	]

	return (
		<div className="space-y-4">
			<h2 className="font-serif text-2xl">My Orders</h2>
			<DataTable
				columns={columns}
				data={orders}
				emptyMessage={loading ? 'Loading orders…' : 'No orders yet.'}
			/>

			{selectedOrder && <OrderDetail order={selectedOrder} onClose={onCloseDetailClick} />}
		</div>
	)
}

export default Orders
