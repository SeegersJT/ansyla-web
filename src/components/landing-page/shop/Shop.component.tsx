import ProductCard from '@/components/product-card/ProductCard.component'
import PageMeta from '@/components/seo/PageMeta.component'
import type { OrderByItem } from '@/containers/landing-page/shop/Shop.helper'
import type { CategoryItem } from '@/redux/types/Category.type'
import type { ProductItem } from '@/redux/types/Product.type'
import type { MaterialOption, OccasionOption, Settings } from '@/redux/types/Settings.type'
import type React from 'react'

function Shop({
	categoryData,
	materialOptions,
	occasionOptions,
	filteredProducts,
	selectedCategory,
	selectedMaxPrice,
	selectedMaterial,
	selectedOccasion,
	selectedOrderBy,
	settings,
	onSelectedCategoryChange,
	onSelectedMaxPriceChange,
	onSelectedMaterialChange,
	onSelectedOccasionChange,
	onSelectedOrderByChange,
}: {
	categoryData: CategoryItem[]
	materialOptions: MaterialOption[]
	occasionOptions: OccasionOption[]
	filteredProducts: ProductItem[]
	selectedCategory: CategoryItem | null
	selectedMaxPrice: number
	selectedMaterial: string | null
	selectedOccasion: string | null
	selectedOrderBy: OrderByItem
	settings: Settings
	onSelectedCategoryChange: (category: CategoryItem | null) => void
	onSelectedMaxPriceChange: (value: number) => void
	onSelectedMaterialChange: (material: string | null) => void
	onSelectedOccasionChange: (occasion: string | null) => void
	onSelectedOrderByChange: (orderBy: OrderByItem) => void
}) {
	const pageTitle = selectedCategory?.name
		? `${selectedCategory.name} Jewelry`
		: 'Shop All Jewelry'

	return (
		<>
			<PageMeta
				title={pageTitle}
				description={`Browse ${filteredProducts.length} pieces${
					selectedCategory ? ` in ${selectedCategory.name}` : ''
				} from ANSYLA's jewelry collection.`}
				path="/shop"
			/>
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
								max={500}
								step={50}
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

						{materialOptions.length > 0 && (
							<FilterGroup title="Material">
								<FilterButton
									active={!selectedMaterial}
									onClick={() => onSelectedMaterialChange(null)}
								>
									All
								</FilterButton>
								{materialOptions.map(option => (
									<FilterButton
										key={option.material}
										active={selectedMaterial === option.material}
										onClick={() => onSelectedMaterialChange(option.material)}
									>
										{option.material}
									</FilterButton>
								))}
							</FilterGroup>
						)}

						{occasionOptions.length > 0 && (
							<FilterGroup title="Occasion">
								<FilterButton
									active={!selectedOccasion}
									onClick={() => onSelectedOccasionChange(null)}
								>
									All
								</FilterButton>
								{occasionOptions.map(option => (
									<FilterButton
										key={option.occasion}
										active={selectedOccasion === option.occasion}
										onClick={() => onSelectedOccasionChange(option.occasion)}
									>
										{option.occasion}
									</FilterButton>
								))}
							</FilterGroup>
						)}
					</aside>

					{/* Products */}
					<div>
						<div className="mb-8 flex items-center justify-between border-b border-border pb-4">
							<p className="text-sm text-muted-foreground">
								{filteredProducts.length} pieces
							</p>
							<select
								value={selectedOrderBy}
								onChange={e =>
									onSelectedOrderByChange(e.target.value as OrderByItem)
								}
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
		</>
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
