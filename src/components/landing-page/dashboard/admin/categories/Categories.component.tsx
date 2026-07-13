import DataField from '@/components/data-field/DataField.component'
import DataTable, { type Column } from '@/components/data-table/DataTable.component'
import type { CategoryForm } from '@/containers/landing-page/dashboard/admin/categories/Categories.containers'
import type { CategoryItem } from '@/redux/types/Category.type'
import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react'
import type React from 'react'

function Categories({
	categories,
	showForm,
	editId,
	form,
	saving,
	convertingImage,
	onAddClick,
	onEditClick,
	onRemoveClick,
	onFormChange,
	onImageFileSelected,
	onCloseFormClick,
	onSaveClick,
}: {
	categories: CategoryItem[]
	showForm: boolean
	editId: string | null
	form: CategoryForm
	saving: boolean
	convertingImage: boolean
	onAddClick: () => void
	onEditClick: (category: CategoryItem) => void
	onRemoveClick: (categoryId: string) => void
	onFormChange: (value: Partial<CategoryForm>) => void
	onImageFileSelected: (files: FileList | null) => void
	onCloseFormClick: () => void
	onSaveClick: (event: React.FormEvent) => void
}) {
	const columns: Column<CategoryItem>[] = [
		{
			key: 'name',
			header: 'Category',
			render: category => (
				<div className="flex items-center gap-3">
					{category.image && (
						<img
							src={category.image}
							alt={category.name}
							className="h-10 w-10 rounded-sm object-cover"
						/>
					)}
					<span>{category.name}</span>
				</div>
			),
		},
		{ key: 'category_no', header: 'ID', accessor: c => c.category_no ?? '—' },
		{
			key: 'category_sequence',
			header: 'Display Order',
			accessor: c => String(c.category_sequence ?? 0),
		},
		{
			key: 'actions',
			header: 'Actions',
			align: 'right',
			render: category => (
				<div className="flex justify-end gap-2">
					<button
						onClick={() => onEditClick(category)}
						className="border border-border p-2 hover:border-primary hover:text-primary"
						aria-label="Edit"
					>
						<Pencil className="h-3.5 w-3.5" />
					</button>
					<button
						onClick={() => onRemoveClick(category.id)}
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
				<h2 className="font-serif text-2xl">Categories</h2>
				<button
					onClick={onAddClick}
					className="flex items-center gap-2 bg-gradient-gold px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground"
				>
					<Plus className="h-4 w-4" /> Add Category
				</button>
			</div>

			<DataTable columns={columns} data={categories} emptyMessage="No categories yet." />

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
					<form
						onSubmit={onSaveClick}
						className="w-full max-w-md space-y-4 border border-border bg-card p-6"
					>
						<div className="flex items-center justify-between">
							<h3 className="font-serif text-xl">
								{editId ? 'Edit Category' : 'Add Category'}
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
						<DataField
							label="Description"
							value={form.description}
							onChange={v => onFormChange({ description: v })}
						/>
						<DataField
							label="Display Order"
							type="number"
							value={form.category_sequence}
							onChange={v => onFormChange({ category_sequence: v })}
						/>

						<div>
							<span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
								Image
							</span>

							{form.image && (
								<img
									src={form.image}
									alt="Category"
									className="mb-3 h-20 w-20 rounded-sm border border-border object-cover"
								/>
							)}

							<label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-border bg-background px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary">
								{convertingImage ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" /> Processing…
									</>
								) : (
									<>
										<Plus className="h-4 w-4" />{' '}
										{form.image ? 'Replace Image' : 'Add Image'}
									</>
								)}
								<input
									type="file"
									accept="image/*"
									disabled={convertingImage}
									onChange={e => onImageFileSelected(e.target.files)}
									className="hidden"
								/>
							</label>
						</div>

						<button
							disabled={saving || convertingImage}
							className="w-full bg-gradient-gold py-3 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60"
						>
							{saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Category'}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Categories
