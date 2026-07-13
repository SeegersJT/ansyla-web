import DataStat from '@/components/data-stat/DataStat.component'
import type { ProductItem } from '@/redux/types/Product.type'
import { Utils } from '@/utils/Utils'

function Overview({
	productCount,
	orderCount,
	customerCount,
	revenue,
	currency,
	lowStockProducts,
}: {
	productCount: number
	orderCount: number
	customerCount: number
	revenue: number
	currency: string | undefined
	lowStockProducts: ProductItem[]
}) {
	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-4">
				<DataStat label="Revenue" value={Utils.formatPrice(revenue, currency)} />
				<DataStat label="Orders" value={String(orderCount)} />
				<DataStat label="Customers" value={String(customerCount)} />
				<DataStat label="Products" value={String(productCount)} />
			</div>

			<div className="border border-border bg-card p-6">
				<h3 className="font-serif text-xl">Low Stock Alerts</h3>
				{lowStockProducts.length === 0 ? (
					<p className="mt-3 text-sm text-muted-foreground">
						All products are well stocked.
					</p>
				) : (
					<ul className="mt-4 space-y-2">
						{lowStockProducts.map(product => (
							<li
								key={product.id}
								className="flex items-center justify-between text-sm"
							>
								<span>{product.name}</span>
								<span className="text-destructive">{product.stock} left</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Overview
