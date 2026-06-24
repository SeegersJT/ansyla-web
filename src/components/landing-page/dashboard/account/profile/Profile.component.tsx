import DataField from '@/components/data-field/DataField.component'
import DataRow from '@/components/data-row/DataRow.component'
import { Utils } from '@/utils/Utils'

function Profile({ editing }: { editing: boolean }) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl">Profile Information</h2>
				{!editing && (
					<button
						onClick={() => {}}
						className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:bg-primary/10"
					>
						Edit
					</button>
				)}
			</div>

			{editing ? (
				<form onSubmit={() => {}} className="space-y-4 border border-border bg-card p-6">
					<DataField label="Full Name" value={'Hanno Seegers'} onChange={() => {}} />
					<DataField
						label="Email"
						type="email"
						value={'seegersjt@outlook,com'}
						onChange={() => {}}
					/>
					<DataField label="Phone" value={'0646543596'} onChange={() => {}} />
					<DataRow label="Membership" value={`${'Gold'} · ${'1500'} pts`} />
					<DataRow
						label="Member Since"
						value={Utils.formatDateReadable(new Date(), {
							month: 'long',
							year: 'numeric',
						})}
					/>
					<div className="flex gap-3 pt-2">
						<button
							type="submit"
							className="bg-gradient-gold px-5 py-2.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
						>
							Save Changes
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
			) : (
				<div className="space-y-4 border border-border bg-card p-6">
					<DataRow label="Full Name" value={'Hanno Seegers'} />
					<DataRow label="Email" value={'seegersjt@outlook.com'} />
					<DataRow label="Phone" value={'0646543596'} />
					<DataRow label="Membership" value={`${'Gold'} · ${'1500'} pts`} />
					<DataRow
						label="Member Since"
						value={Utils.formatDateReadable(new Date(), {
							month: 'long',
							year: 'numeric',
						})}
					/>
				</div>
			)}
		</div>
	)
}

export default Profile
