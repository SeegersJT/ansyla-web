import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import OrderDetail from '@/components/order-detail/OrderDetail.component'
import type { CustomerItem } from '@/redux/types/Customer.type'
import type { OrderItem } from '@/redux/types/Order.type'
import { Utils } from '@/utils/Utils'
import { Eye, Search, X } from 'lucide-react'

function Customers({
	customers,
	loading,
	search,
	selectedCustomer,
	customerOrders,
	selectedOrder,
	onSearchChange,
	onViewCustomerClick,
	onCloseCustomerDetailClick,
	onViewOrderClick,
	onCloseOrderDetailClick,
}: {
	customers: CustomerItem[]
	loading: boolean
	search: string
	selectedCustomer: CustomerItem | null
	customerOrders: OrderItem[]
	selectedOrder: OrderItem | null
	onSearchChange: (value: string) => void
	onViewCustomerClick: (customer: CustomerItem) => void
	onCloseCustomerDetailClick: () => void
	onViewOrderClick: (order: OrderItem) => void
	onCloseOrderDetailClick: () => void
}) {
	const columns: Column<CustomerItem>[] = [
		{ key: 'name', header: 'Name' },
		{ key: 'email', header: 'Email', accessor: c => c.email },
		{ key: 'phone', header: 'Phone', accessor: c => c.phone || '—' },
		{ key: 'orders', header: 'Orders', accessor: c => String(c.orders) },
		{ key: 'spent', header: 'Spent', accessor: c => Utils.formatPrice(c.spent) },
		{
			key: 'tier',
			header: 'Tier',
			render: c => (
				<span className="border border-primary/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
					{c.tier}
				</span>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			align: 'right',
			render: customer => (
				<button
					onClick={() => onViewCustomerClick(customer)}
					className="border border-border p-2 hover:border-primary hover:text-primary"
					aria-label="View customer"
				>
					<Eye className="h-3.5 w-3.5" />
				</button>
			),
		},
	]

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="font-serif text-2xl">Customers</h2>
				<div className="relative w-full sm:w-64">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						value={search}
						onChange={e => onSearchChange(e.target.value)}
						placeholder="Search by name or email"
						className="w-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
					/>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={customers}
				emptyMessage={loading ? 'Loading customers…' : 'No customers yet.'}
			/>

			{selectedCustomer && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
					<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6">
						<div className="flex items-start justify-between border-b border-border pb-4">
							<div>
								<h3 className="font-serif text-2xl">{selectedCustomer.name}</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									{selectedCustomer.email}
								</p>
								{selectedCustomer.phone && (
									<p className="text-sm text-muted-foreground">
										{selectedCustomer.phone}
									</p>
								)}
							</div>
							<button onClick={onCloseCustomerDetailClick} aria-label="Close">
								<X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
							</button>
						</div>

						<div className="mt-4">
							<span className="border border-primary/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
								{selectedCustomer.tier} Member
							</span>
						</div>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<div className="border border-border bg-background p-4 text-center">
								<p className="font-serif text-2xl text-primary">
									{selectedCustomer.orders}
								</p>
								<p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
									Orders
								</p>
							</div>
							<div className="border border-border bg-background p-4 text-center">
								<p className="font-serif text-2xl text-primary">
									{Utils.formatPrice(selectedCustomer.spent)}
								</p>
								<p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
									Total Spent
								</p>
							</div>
						</div>

						<div className="mt-6">
							<h4 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
								Order History
							</h4>
							{customerOrders.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									This customer hasn't placed any orders yet.
								</p>
							) : (
								<div className="space-y-2">
									{customerOrders.map(order => (
										<button
											key={order.id}
											type="button"
											onClick={() => onViewOrderClick(order)}
											className="flex w-full flex-wrap items-center justify-between gap-2 border border-border bg-background px-4 py-3 text-left text-sm hover:border-primary"
										>
											<span>{order.order_no ?? order.id}</span>
											<span className="text-xs text-muted-foreground">
												{String(order.createdAt)}
											</span>
											<span className="border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
												{order.status}
											</span>
											<span className="text-primary">
												{Utils.formatPrice(order.total)}
											</span>
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{selectedOrder && (
				<OrderDetail order={selectedOrder} onClose={onCloseOrderDetailClick} />
			)}
		</div>
	)
}

export default Customers
