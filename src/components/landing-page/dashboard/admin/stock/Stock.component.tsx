import DataField from '@/components/data-field/DataField.component'
import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import type { StockForm } from '@/containers/landing-page/dashboard/admin/stock/Stock.container'
import type { CategoryItem } from '@/redux/types/Category.type'
import type { ProductItem } from '@/redux/types/Product.type'
import { Utils } from '@/utils/Utils'
import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react'
import type React from 'react'

function Stock({
	products,
	categoryData,
	showForm,
	editId,
	form,
	saving,
	convertingImages,
	onAddClick,
	onEditClick,
	onRemoveClick,
	onFormChange,
	onImageFilesSelected,
	onRemoveImageClick,
	onCloseFormClick,
	onSaveClick,
}: {
	products: ProductItem[]
	categoryData: CategoryItem[]
	showForm: boolean
	editId: string | null
	form: StockForm
	saving: boolean
	convertingImages: boolean
	onAddClick: () => void
	onEditClick: (product: ProductItem) => void
	onRemoveClick: (productId: string) => void
	onFormChange: (value: Partial<StockForm>) => void
	onImageFilesSelected: (files: FileList | null) => void
	onRemoveImageClick: (url: string) => void
	onCloseFormClick: () => void
	onSaveClick: (event: React.FormEvent) => void
}) {
	const columns: Column<ProductItem>[] = [
		{
			key: 'name',
			header: 'Product',
			render: product => (
				<div className="flex items-center gap-3">
					<img
						src={product.images?.[0]?.url}
						alt={product.name}
						className="h-10 w-10 rounded-sm object-cover"
					/>
					<span>{product.name}</span>
				</div>
			),
		},
		{ key: 'category_name', header: 'Category', accessor: p => p.category_name },
		{ key: 'price', header: 'Price', accessor: p => Utils.formatPrice(p.price) },
		{
			key: 'stock',
			header: 'Stock',
			render: product => (
				<span
					className={
						(product.stock ?? 0) <= 3 ? 'text-destructive' : 'text-muted-foreground'
					}
				>
					{product.stock}
				</span>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			align: 'right',
			render: product => (
				<div className="flex justify-end gap-2">
					<button
						onClick={() => onEditClick(product)}
						className="border border-border p-2 hover:border-primary hover:text-primary"
						aria-label="Edit"
					>
						<Pencil className="h-3.5 w-3.5" />
					</button>
					<button
						onClick={() => onRemoveClick(product.id)}
						className="border border-border p-2 hover:border-destructive hover:text-destructive"
						aria-label="Delete"
					>
						<Trash2 className="h-3.5 w-3.5" />
					</button>
				</div>
			),
		},
	]

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl">Inventory</h2>
				<button
					onClick={onAddClick}
					className="flex items-center gap-2 bg-gradient-gold px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground"
				>
					<Plus className="h-4 w-4" /> Add Product
				</button>
			</div>

			<DataTable columns={columns} data={products} emptyMessage="No products yet." />

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
					<form
						onSubmit={onSaveClick}
						className="max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto border border-border bg-card p-6"
					>
						<div className="flex items-center justify-between">
							<h3 className="font-serif text-xl">
								{editId ? 'Edit Product' : 'Add Product'}
							</h3>
							<button type="button" onClick={onCloseFormClick} aria-label="Close">
								<X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
							</button>
						</div>

						<DataField
							label="Name"
							value={form.name}
							onChange={v => onFormChange({ name: v })}
						/>

						<label className="block">
							<span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
								Category
							</span>
							<select
								value={form.category_id}
								onChange={e => onFormChange({ category_id: e.target.value })}
								className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
							>
								<option value="">Select a category</option>
								{categoryData.map(category => (
									<option key={category.id} value={category.id ?? ''}>
										{category.name}
									</option>
								))}
							</select>
						</label>

						<DataField
							label="Description"
							value={form.description}
							onChange={v => onFormChange({ description: v })}
						/>
						<DataField
							label="Price (ZAR)"
							type="number"
							value={form.price}
							onChange={v => onFormChange({ price: v })}
						/>
						<DataField
							label="Stock Quantity"
							type="number"
							value={form.stock}
							onChange={v => onFormChange({ stock: v })}
						/>

						<div>
							<span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
								Images
							</span>

							{form.images.length > 0 && (
								<div className="mb-3 flex flex-wrap gap-2">
									{form.images.map((image, index) => (
										<div
											key={`${image.url.slice(0, 32)}-${index}`}
											className="group relative"
										>
											<img
												src={image.url}
												alt="Product"
												className="h-16 w-16 rounded-sm border border-border object-cover"
											/>
											<button
												type="button"
												onClick={() => onRemoveImageClick(image.url)}
												className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
												aria-label="Remove image"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
							)}

							<label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-border bg-background px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary">
								{convertingImages ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" /> Processing…
									</>
								) : (
									<>
										<Plus className="h-4 w-4" /> Add Image
									</>
								)}
								<input
									type="file"
									accept="image/*"
									multiple
									disabled={convertingImages}
									onChange={e => onImageFilesSelected(e.target.files)}
									className="hidden"
								/>
							</label>
						</div>

						<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.gold}
									onChange={e => onFormChange({ gold: e.target.checked })}
									className="h-4 w-4 accent-primary"
								/>
								Gold
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.stainless_Steel}
									onChange={e =>
										onFormChange({ stainless_Steel: e.target.checked })
									}
									className="h-4 w-4 accent-primary"
								/>
								Stainless Steel
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.is_new}
									onChange={e => onFormChange({ is_new: e.target.checked })}
									className="h-4 w-4 accent-primary"
								/>
								New
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.is_best_seller}
									onChange={e =>
										onFormChange({ is_best_seller: e.target.checked })
									}
									className="h-4 w-4 accent-primary"
								/>
								Best Seller
							</label>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.active}
									onChange={e => onFormChange({ active: e.target.checked })}
									className="h-4 w-4 accent-primary"
								/>
								Active
							</label>
						</div>

						<button
							disabled={saving || convertingImages}
							className="w-full bg-gradient-gold py-3 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60"
						>
							{saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Product'}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Stock
