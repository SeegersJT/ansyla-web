import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import OrderDetail from '@/components/order-detail/OrderDetail.component'
import { CANCELLED_ORDER_STATUS, type OrderItem } from '@/redux/types/Order.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { OrderStatus } from '@/redux/types/Settings.type'
import { Utils } from '@/utils/Utils'
import { Ban, Eye } from 'lucide-react'

function Orders({
	orders,
	products,
	loading,
	statusOptions,
	selectedOrder,
	markingAsPaid,
	cancelling,
	onStatusChange,
	onViewOrderClick,
	onCloseDetailClick,
	onMarkAsPaidClick,
	onCancelOrderClick,
}: {
	orders: OrderItem[]
	products: ProductItem[]
	loading: boolean
	statusOptions: OrderStatus[]
	selectedOrder: OrderItem | null
	markingAsPaid: boolean
	cancelling: boolean
	onStatusChange: (id: string, status: string) => void
	onViewOrderClick: (order: OrderItem) => void
	onCloseDetailClick: () => void
	onMarkAsPaidClick: (id: string) => void
	onCancelOrderClick: (order: OrderItem) => void
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
			key: 'payment',
			header: 'Payment',
			render: order => (
				<div className="space-y-1">
					<p className="text-xs text-muted-foreground">{order.payment_method}</p>
					<span
						className={`inline-block border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
							order.payment_status === 'Paid'
								? 'border-green-500/40 text-green-500'
								: 'border-yellow-500/40 text-yellow-500'
						}`}
					>
						{order.payment_status}
					</span>
					{order.payment_status === 'Pending Payment' &&
						order.status !== CANCELLED_ORDER_STATUS && (
							<button
								onClick={() => onMarkAsPaidClick(order.id)}
								disabled={markingAsPaid}
								className="block text-[10px] uppercase tracking-wider text-primary hover:underline disabled:opacity-60"
							>
								Mark as Paid
							</button>
						)}
				</div>
			),
		},
		{
			key: 'status',
			header: 'Status',
			render: order =>
				order.status === CANCELLED_ORDER_STATUS ? (
					<span className="inline-block border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-wider text-destructive">
						Cancelled
					</span>
				) : (
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
					{Utils.isOrderCancellable(order.status, statusOptions, 'admin') && (
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
			<h2 className="font-serif text-2xl">Customer Orders</h2>
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
						<div className="flex flex-wrap gap-3">
							{selectedOrder.payment_status === 'Pending Payment' &&
								selectedOrder.status !== CANCELLED_ORDER_STATUS && (
									<button
										onClick={() => onMarkAsPaidClick(selectedOrder.id)}
										disabled={markingAsPaid}
										className="bg-gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60 "
									>
										{markingAsPaid ? 'Updating…' : 'Mark as Paid'}
									</button>
								)}
							{Utils.isOrderCancellable(
								selectedOrder.status,
								statusOptions,
								'admin'
							) && (
								<button
									onClick={() => onCancelOrderClick(selectedOrder)}
									disabled={cancelling}
									className="border border-destructive px-5 py-2.5 text-xs uppercase tracking-wider text-destructive hover:bg-destructive hover:text-primary-foreground disabled:opacity-60 "
								>
									{cancelling ? 'Cancelling…' : 'Cancel Order'}
								</button>
							)}
						</div>
					}
				/>
			)}
		</div>
	)
}

export default Orders
