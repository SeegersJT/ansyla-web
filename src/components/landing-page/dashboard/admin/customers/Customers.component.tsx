import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import type { CustomerItem } from '@/redux/types/Customer.type'
import { Utils } from '@/utils/Utils'

function Customers({ customers, loading }: { customers: CustomerItem[]; loading: boolean }) {
	const columns: Column<CustomerItem>[] = [
		{ key: 'name', header: 'Name' },
		{ key: 'email', header: 'Email', accessor: c => c.email },
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
	]

	return (
		<div className="space-y-4">
			<h2 className="font-serif text-2xl">Customers</h2>
			<DataTable
				columns={columns}
				data={customers}
				emptyMessage={loading ? 'Loading customers…' : 'No customers yet.'}
			/>
		</div>
	)
}

export default Customers
