import DataField from '@/components/data-field/DataField.component'

function Addresses({ selectedAddress }: { selectedAddress: string | null }) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl">Saved Addresses</h2>
				{selectedAddress === null && (
					<button
						onClick={() => {}}
						className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:bg-primary/10"
					>
						Add Address
					</button>
				)}
			</div>

			{selectedAddress !== null && (
				<form onSubmit={() => {}} className="space-y-4 border border-border bg-card p-6">
					<p className="font-serif text-lg">
						{selectedAddress === 'new' ? 'New Address' : 'Edit Address'}
					</p>
					<DataField label="Label" value={'Home'} onChange={() => {}} />
					<DataField
						label="Street Address"
						value={'13 Steenbok Street'}
						onChange={() => {}}
					/>
					<div className="grid gap-4 sm:grid-cols-3">
						<DataField label="City" value={'Potchefstroom'} onChange={() => {}} />
						<DataField label="Province" value={'North-West'} onChange={() => {}} />
						<DataField label="Postal Code" value={'1234'} onChange={() => {}} />
					</div>
					<label className="flex items-center gap-2 text-sm text-muted-foreground">
						<input
							type="checkbox"
							checked={false}
							onChange={() => {}}
							className="h-4 w-4 accent-primary"
						/>
						Set as default address
					</label>
					<div className="flex gap-3 pt-2">
						<button
							type="submit"
							className="bg-gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
						>
							Save Address
						</button>
						<button
							type="button"
							onClick={() => {}}
							className="border border-border px-5 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary"
						>
							Cancel
						</button>
					</div>
				</form>
			)}

			<div className="grid gap-4 sm:grid-cols-2">
				{/* {addresses.map(a => (
					<div key={a.id} className="flex flex-col border border-border bg-card p-5">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">{a.label}</p>
							{a.isDefault && (
								<span className="text-[10px] uppercase tracking-wider text-primary">
									Default
								</span>
							)}
						</div>
						<p className="mt-2 text-sm text-muted-foreground">{a.line1}</p>
						<p className="text-sm text-muted-foreground">
							{a.city}, {a.province} {a.postalCode}
						</p>
						<div className="mt-4 flex gap-2 border-t border-border pt-3">
							<button
								onClick={() => startEdit(a)}
								className="text-xs uppercase tracking-wider text-primary hover:underline"
							>
								Edit
							</button>
							<span className="text-border">·</span>
							<button
								onClick={() => remove(a.id)}
								className="text-xs uppercase tracking-wider text-destructive hover:underline"
							>
								Delete
							</button>
						</div>
					</div>
				))}
				{addresses.length === 0 && (
					<p className="text-sm text-muted-foreground">No saved addresses yet.</p>
				)} */}
			</div>
		</div>
	)
}

export default Addresses
