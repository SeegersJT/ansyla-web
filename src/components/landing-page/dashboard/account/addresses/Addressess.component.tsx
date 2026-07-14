import DataField from '@/components/data-field/DataField.component'
import type { AddressForm } from '@/containers/landing-page/dashboard/account/addresses/Addresses.container'
import type { AddressItem } from '@/redux/types/Address.type'
import type React from 'react'

function Addresses({
	addresses,
	editId,
	form,
	saving,
	onAddClick,
	onEditClick,
	onCancelClick,
	onRemoveClick,
	onFormChange,
	onSaveClick,
}: {
	addresses: AddressItem[]
	editId: string | 'new' | null
	form: AddressForm
	saving: boolean
	onAddClick: () => void
	onEditClick: (address: AddressItem) => void
	onCancelClick: () => void
	onRemoveClick: (addressId: string) => void
	onFormChange: (value: Partial<AddressForm>) => void
	onSaveClick: (event: React.FormEvent) => void
}) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl">Saved Addresses</h2>
				{editId === null && (
					<button
						onClick={onAddClick}
						className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:bg-primary/10"
					>
						Add Address
					</button>
				)}
			</div>

			{editId !== null && (
				<form onSubmit={onSaveClick} className="space-y-4 border border-border bg-card p-6">
					<p className="font-serif text-lg">
						{editId === 'new' ? 'New Address' : 'Edit Address'}
					</p>
					<DataField
						label="Label"
						value={form.label}
						onChange={v => onFormChange({ label: v })}
					/>
					<DataField
						label="Full Name"
						value={form.full_name}
						onChange={v => onFormChange({ full_name: v })}
					/>
					<DataField
						label="Phone Number"
						value={form.phone_number}
						onChange={v => onFormChange({ phone_number: v })}
					/>
					<DataField
						label="Street Address"
						value={form.line1}
						onChange={v => onFormChange({ line1: v })}
					/>
					<div className="grid gap-4 sm:grid-cols-3">
						<DataField
							label="City"
							value={form.city}
							onChange={v => onFormChange({ city: v })}
						/>
						<DataField
							label="Province"
							value={form.province}
							onChange={v => onFormChange({ province: v })}
						/>
						<DataField
							label="Postal Code"
							value={form.postal_code}
							onChange={v => onFormChange({ postal_code: v })}
						/>
					</div>
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={form.is_default}
							onChange={e => onFormChange({ is_default: e.target.checked })}
							className="h-4 w-4 accent-primary"
						/>
						Set as default address
					</label>
					<div className="flex gap-3 pt-2">
						<button
							type="submit"
							disabled={saving}
							className="bg-gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60"
						>
							{saving ? 'Saving…' : 'Save Address'}
						</button>
						<button
							type="button"
							onClick={onCancelClick}
							className="border border-border px-5 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary"
						>
							Cancel
						</button>
					</div>
				</form>
			)}

			<div className="grid gap-4 sm:grid-cols-2">
				{addresses.map(address => (
					<div
						key={address.id}
						className="flex flex-col border border-border bg-card p-5"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">{address.label}</p>
							{address.is_default && (
								<span className="text-[10px] uppercase tracking-wider text-primary">
									Default
								</span>
							)}
						</div>
						<p className="mt-2 text-sm text-muted-foreground">{address.line1}</p>
						<p className="text-sm text-muted-foreground">
							{address.city}, {address.province} {address.postal_code}
						</p>
						<div className="mt-4 flex gap-2 border-t border-border pt-3">
							<button
								onClick={() => onEditClick(address)}
								className="text-xs uppercase tracking-wider text-primary hover:underline"
							>
								Edit
							</button>
							<span className="text-border">·</span>
							<button
								onClick={() => onRemoveClick(address.id)}
								className="text-xs uppercase tracking-wider text-destructive hover:underline"
							>
								Delete
							</button>
						</div>
					</div>
				))}
				{addresses.length === 0 && editId === null && (
					<p className="text-sm text-muted-foreground">No saved addresses yet.</p>
				)}
			</div>
		</div>
	)
}

export default Addresses
