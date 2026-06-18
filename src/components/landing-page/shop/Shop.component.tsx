import ProductCard from '@/components/product-card/ProductCard.component'
import type { OrderByItem } from '@/containers/landing-page/shop/Shop.helper'
import type { CategoryItem } from '@/redux/types/Category.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { Settings } from '@/redux/types/Settings.type'
import type React from 'react'

function Shop({
	categoryData,
	filteredProducts,
	selectedCategory,
	selectedMaxPrice,
	selectedOrderBy,
	settings,
	onSelectedCategoryChange,
	onSelectedMaxPriceChange,
	onSelectedOrderByChange,
}: {
	categoryData: CategoryItem[]
	filteredProducts: ProductItem[]
	selectedCategory: CategoryItem | null
	selectedMaxPrice: number
	selectedOrderBy: OrderByItem
	settings: Settings
	onSelectedCategoryChange: (category: CategoryItem | null) => void
	onSelectedMaxPriceChange: (value: number) => void
	onSelectedOrderByChange: (orderBy: OrderByItem) => void
}) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<div className="mb-10 text-center">
				<p className="text-xs uppercase tracking-luxe text-primary">Collection</p>
				<h1 className="mt-3 font-serif text-4xl sm:text-5xl">
					{selectedCategory?.name ?? 'All Jewelry'}
				</h1>
			</div>

			<div className="grid gap-10 lg:grid-cols-[260px_1fr]">
				{/* Filters */}
				<aside className="space-y-8">
					<FilterGroup title="Category">
						<FilterButton
							active={!selectedCategory}
							onClick={() => onSelectedCategoryChange(null)}
						>
							All
						</FilterButton>
						{categoryData.map(category => (
							<FilterButton
								key={category.id}
								active={selectedCategory?.id === category.id}
								onClick={() => onSelectedCategoryChange(category)}
							>
								{category.name}
							</FilterButton>
						))}
					</FilterGroup>

					<FilterGroup title="Price Range">
						<input
							type="range"
							min={100}
							max={1000}
							step={100}
							value={selectedMaxPrice}
							onChange={e => onSelectedMaxPriceChange(Number(e.target.value))}
							className="w-full accent-[var(--gold)]"
						/>
						<p className="text-sm text-muted-foreground">
							Up to{' '}
							<span className="text-primary">
								R{selectedMaxPrice.toLocaleString('en-ZA')}
							</span>
						</p>
					</FilterGroup>

					{/* <FilterGroup title="Material">
                        <FilterButton active={!material} onClick={() => setMaterial(null)}>
                            All
                        </FilterButton>
                        {materials.map((m) => (
                            <FilterButton key={m} active={material === m} onClick={() => setMaterial(m)}>
                                {m}
                            </FilterButton>
                        ))}
                    </FilterGroup> */}

					{/* <FilterGroup title="Occasion">
                        <FilterButton active={!occasion} onClick={() => setOccasion(null)}>
                            All
                        </FilterButton>
                        {occasions.map((o) => (
                            <FilterButton key={o} active={occasion === o} onClick={() => setOccasion(o)}>
                                {o}
                            </FilterButton>
                        ))}
                    </FilterGroup> */}
				</aside>

				{/* Products */}
				<div>
					<div className="mb-8 flex items-center justify-between border-b border-border pb-4">
						<p className="text-sm text-muted-foreground">
							{filteredProducts.length} pieces
						</p>
						<select
							value={selectedOrderBy}
							onChange={e => onSelectedOrderByChange(e.target.value as OrderByItem)}
							className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
						>
							<option value="featured">Featured</option>
							<option value="newest">Newest</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
							<option value="popular">Most Popular</option>
						</select>
					</div>

					{filteredProducts.length === 0 ? (
						<p className="py-20 text-center text-muted-foreground">
							No pieces match your filters.
						</p>
					) : (
						<div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
							{filteredProducts.map(product => (
								<ProductCard
									key={product?.id}
									currency={settings?.currency}
									product={product}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div>
			<h3 className="mb-3 text-xs uppercase tracking-luxe text-primary">{title}</h3>
			<div className="flex flex-col gap-1.5">{children}</div>
		</div>
	)
}

function FilterButton({
	active,
	onClick,
	children,
}: {
	active: boolean
	onClick: () => void
	children: React.ReactNode
}) {
	return (
		<button
			onClick={onClick}
			className={`text-left text-sm transition-colors ${
				active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
			}`}
		>
			{active ? '✦ ' : ''}
			{children}
		</button>
	)
}

export default Shop
