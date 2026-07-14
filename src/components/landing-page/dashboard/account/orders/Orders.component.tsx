import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import OrderDetail from '@/components/order-detail/OrderDetail.component'
import { CANCELLED_ORDER_STATUS, type OrderItem } from '@/redux/types/Order.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { OrderStatus } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'
import { Ban, Eye, Package } from 'lucide-react'
import { Link } from 'react-router'

function Orders({
	orders,
	products,
	loading,
	statusOptions,
	selectedOrder,
	cancelling,
	onViewOrderClick,
	onCloseDetailClick,
	onCancelOrderClick,
}: {
	orders: OrderItem[]
	products: ProductItem[]
	loading: boolean
	statusOptions: OrderStatus[]
	selectedOrder: OrderItem | null
	cancelling: boolean
	onViewOrderClick: (order: OrderItem) => void
	onCloseDetailClick: () => void
	onCancelOrderClick: (order: OrderItem) => void
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
		{ key: 'createdAt', header: 'Date', accessor: order => String(order.createdAt) },
		{ key: 'total', header: 'Total', accessor: order => Utils.formatPrice(order.total) },
		{
			key: 'status',
			header: 'Status',
			render: order => (
				<span
					className={`border px-3 py-1 text-[10px] uppercase tracking-wider ${
						order.status === CANCELLED_ORDER_STATUS
							? 'border-destructive/40 text-destructive'
							: 'border-primary/40 text-primary'
					}`}
				>
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
				<div className="flex justify-end gap-2">
					<button
						onClick={() => onViewOrderClick(order)}
						className="border border-border p-2 hover:border-primary hover:text-primary "
						aria-label="View order"
					>
						<Eye className="h-3.5 w-3.5" />
					</button>
					{Utils.isOrderCancellable(order.status, statusOptions, 'customer') && (
						<button
							onClick={() => onCancelOrderClick(order)}
							disabled={cancelling}
							className="border border-border p-2 hover:border-destructive hover:text-destructive disabled:opacity-60 "
							aria-label="Cancel order"
						>
							<Ban className="h-3.5 w-3.5" />
						</button>
					)}
				</div>
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

			{selectedOrder && (
				<OrderDetail
					order={selectedOrder}
					products={products}
					onClose={onCloseDetailClick}
					actions={
						Utils.isOrderCancellable(
							selectedOrder.status,
							statusOptions,
							'customer'
						) ? (
							<button
								onClick={() => onCancelOrderClick(selectedOrder)}
								disabled={cancelling}
								className="border border-destructive px-5 py-2.5 text-xs uppercase tracking-wider text-destructive hover:bg-destructive hover:text-primary-foreground disabled:opacity-60 "
							>
								{cancelling ? 'Cancelling…' : 'Cancel Order'}
							</button>
						) : undefined
					}
				/>
			)}
		</div>
	)
}

export default Orders
