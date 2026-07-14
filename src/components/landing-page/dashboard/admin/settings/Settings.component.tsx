import DataField from '@/components/data-field/DataField.component'
import type { SettingsForm } from '@/containers/landing-page/dashboard/admin/settings/Settings.container'
import type {
	OrderStatus,
	SettingsBankDetails,
	SettingsPrefix,
	SettingsSequence,
} from '@/redux/types/Settings.type'
import { Plus, Trash2 } from 'lucide-react'
import type React from 'react'

function SettingsComponent({
	form,
	saving,
	onFormChange,
	onPrefixChange,
	onSequenceChange,
	onBankDetailsChange,
	onStatusChange,
	onAddStatusClick,
	onRemoveStatusClick,
	onSaveClick,
}: {
	form: SettingsForm
	saving: boolean
	onFormChange: (value: Partial<SettingsForm>) => void
	onPrefixChange: (key: keyof SettingsPrefix, value: string) => void
	onSequenceChange: (key: keyof SettingsSequence, value: string) => void
	onBankDetailsChange: (key: keyof SettingsBankDetails, value: string) => void
	onStatusChange: (index: number, value: Partial<OrderStatus>) => void
	onAddStatusClick: () => void
	onRemoveStatusClick: (index: number) => void
	onSaveClick: (event: React.FormEvent) => void
}) {
	return (
		<form onSubmit={onSaveClick} className="space-y-8">
			<h2 className="font-serif text-2xl">Store Settings</h2>

			<section className="space-y-4 border border-border bg-card p-6">
				<h3 className="text-xs uppercase tracking-luxe text-primary">General</h3>
				<div className="grid gap-4 sm:grid-cols-2">
					<DataField
						label="Store Name"
						value={form.store_name}
						onChange={v => onFormChange({ store_name: v })}
					/>
					<DataField
						label="Currency"
						value={form.currency}
						onChange={v => onFormChange({ currency: v })}
					/>
					<DataField
						label="Currency Symbol"
						value={form.currency_symbol}
						onChange={v => onFormChange({ currency_symbol: v })}
					/>
					<DataField
						label="Shipping Cost"
						type="number"
						value={form.shipping_cost}
						onChange={v => onFormChange({ shipping_cost: v })}
					/>
					<DataField
						label="Free Shipping Threshold"
						type="number"
						value={form.free_shipping_threshold}
						onChange={v => onFormChange({ free_shipping_threshold: v })}
					/>
				</div>
			</section>

			<section className="space-y-4 border border-border bg-card p-6">
				<h3 className="text-xs uppercase tracking-luxe text-primary">
					Identifier Prefixes
				</h3>
				<p className="text-xs text-muted-foreground">
					Combined with the next sequence number below to form friendly IDs, e.g. "
					{form.prefixes.order_prefix || 'ORD'}-00042".
				</p>
				<div className="grid gap-4 sm:grid-cols-2">
					<DataField
						label="Category Prefix"
						value={form.prefixes.category_prefix ?? ''}
						onChange={v => onPrefixChange('category_prefix', v)}
					/>
					<DataField
						label="Order Prefix"
						value={form.prefixes.order_prefix ?? ''}
						onChange={v => onPrefixChange('order_prefix', v)}
					/>
					<DataField
						label="Product Prefix"
						value={form.prefixes.product_prefix ?? ''}
						onChange={v => onPrefixChange('product_prefix', v)}
					/>
					<DataField
						label="User Prefix"
						value={form.prefixes.user_prefix ?? ''}
						onChange={v => onPrefixChange('user_prefix', v)}
					/>
				</div>
			</section>

			<section className="space-y-4 border border-border bg-card p-6">
				<h3 className="text-xs uppercase tracking-luxe text-primary">
					Next Sequence Numbers
				</h3>
				<p className="text-xs text-muted-foreground">
					Advances automatically as categories, products, orders, and users are created.
					Only override this if you need to manually realign a sequence.
				</p>
				<div className="grid gap-4 sm:grid-cols-2">
					<DataField
						label="Category Sequence"
						type="number"
						value={String(form.sequences.category_no ?? 0)}
						onChange={v => onSequenceChange('category_no', v)}
					/>
					<DataField
						label="Order Sequence"
						type="number"
						value={String(form.sequences.order_no ?? 0)}
						onChange={v => onSequenceChange('order_no', v)}
					/>
					<DataField
						label="Product Sequence"
						type="number"
						value={String(form.sequences.product_no ?? 0)}
						onChange={v => onSequenceChange('product_no', v)}
					/>
					<DataField
						label="User Sequence"
						type="number"
						value={String(form.sequences.user_no ?? 0)}
						onChange={v => onSequenceChange('user_no', v)}
					/>
				</div>
			</section>

			<section className="space-y-4 border border-border bg-card p-6">
				<h3 className="text-xs uppercase tracking-luxe text-primary">
					Manual EFT Banking Details
				</h3>
				<p className="text-xs text-muted-foreground">
					Shown to customers at checkout when they select Manual EFT as their payment
					method.
				</p>
				<div className="grid gap-4 sm:grid-cols-2">
					<DataField
						label="Bank Name"
						value={form.bank_details.bank_name ?? ''}
						onChange={v => onBankDetailsChange('bank_name', v)}
					/>
					<DataField
						label="Account Holder"
						value={form.bank_details.account_holder ?? ''}
						onChange={v => onBankDetailsChange('account_holder', v)}
					/>
					<DataField
						label="Account Number"
						value={form.bank_details.account_number ?? ''}
						onChange={v => onBankDetailsChange('account_number', v)}
					/>
					<DataField
						label="Branch Code"
						value={form.bank_details.branch_code ?? ''}
						onChange={v => onBankDetailsChange('branch_code', v)}
					/>
					<DataField
						label="Account Type"
						value={form.bank_details.account_type ?? ''}
						onChange={v => onBankDetailsChange('account_type', v)}
					/>
				</div>
			</section>

			<section className="space-y-4 border border-border bg-card p-6">
				<div className="flex items-center justify-between">
					<h3 className="text-xs uppercase tracking-luxe text-primary">Order Statuses</h3>
					<button
						type="button"
						onClick={onAddStatusClick}
						className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary hover:underline "
					>
						<Plus className="h-3.5 w-3.5" /> Add Status
					</button>
				</div>
				<p className="text-xs text-muted-foreground">
					Drives the status options available on the Orders tab. Lower numbers are treated
					as earlier stages.
				</p>

				<div className="space-y-3">
					{form.statuses.map((status, index) => (
						<div key={index} className="flex items-end gap-3">
							<div className="flex-1">
								<DataField
									label="Status"
									value={status.status ?? ''}
									onChange={v => onStatusChange(index, { status: v })}
								/>
							</div>
							<div className="w-28">
								<DataField
									label="Order"
									type="number"
									value={String(status.status_no ?? 0)}
									onChange={v =>
										onStatusChange(index, { status_no: Number(v) || 0 })
									}
								/>
							</div>
							<button
								type="button"
								onClick={() => onRemoveStatusClick(index)}
								className="mb-0.5 border border-border p-3 hover:border-destructive hover:text-destructive"
								aria-label="Remove status"
							>
								<Trash2 className="h-3.5 w-3.5" />
							</button>
						</div>
					))}
					{form.statuses.length === 0 && (
						<p className="text-sm text-muted-foreground">No statuses configured yet.</p>
					)}
				</div>
			</section>

			<button
				disabled={saving}
				className="w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60 "
			>
				{saving ? 'Saving…' : 'Save Settings'}
			</button>
		</form>
	)
}

export default SettingsComponent
