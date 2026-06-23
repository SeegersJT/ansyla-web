import type { User } from 'firebase/auth'
import { LogOut, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'

function Account({ user }: { user: User }) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
				<div>
					<p className="text-xs uppercase tracking-luxe text-primary">My Account</p>
					<h1 className="mt-2 font-serif text-4xl">Hello, {user?.displayName}</h1>
				</div>
				<div className="flex items-center gap-3">
					{/* {user?.role === 'admin' && (
						<Link
							to="/admin"
							className="flex items-center gap-2 border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:bg-primary/10"
						>
							<ShieldCheck className="h-4 w-4" /> Admin
						</Link>
					)} */}
					<button
						// onClick={logout}
						className="flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary"
					>
						<LogOut className="h-4 w-4" /> Logout
					</button>
				</div>
			</div>

			<div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
				{/* Side nav */}
				<nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
					{/* {tabs.map(t => (
						<button
							key={t.id}
							onClick={() => setTab(t.id)}
							className={`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
								tab === t.id
									? 'bg-gradient-gold text-primary-foreground'
									: 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
							}`}
						>
							<t.icon className="h-4 w-4" /> {t.label}
						</button>
					))} */}
				</nav>

				<div>
					{/* {tab === 'overview' && <Overview onSeeOrders={() => setTab('orders')} />}
					{tab === 'orders' && <Orders />}
					{tab === 'wishlist' && <Wishlist />}
					{tab === 'addresses' && <Addresses />}
					{tab === 'profile' && <Profile />} */}
				</div>
			</div>
		</div>
	)
}

// function Overview({ onSeeOrders }: { onSeeOrders: () => void }) {
// 	const totalSpent = myOrders.reduce((s, o) => s + o.total, 0)
// 	return (
// 		<div className="space-y-6">
// 			<div className="border border-primary/30 bg-card p-6 shadow-gold">
// 				<div className="flex items-center gap-3">
// 					<Award className="h-7 w-7 text-primary" />
// 					<div>
// 						<p className="font-serif text-2xl">ANSYLA Rewards</p>
// 						<p className="text-xs uppercase tracking-wider text-primary">
// 							{mockProfile.tier} Member
// 						</p>
// 					</div>
// 				</div>
// 				<div className="mt-5">
// 					<div className="flex justify-between text-xs text-muted-foreground">
// 						<span>{mockProfile.points.toLocaleString()} pts</span>
// 						<span>Platinum at 2 000</span>
// 					</div>
// 					<div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
// 						<div
// 							className="h-full bg-gradient-gold"
// 							style={{ width: `${(mockProfile.points / 2000) * 100}%` }}
// 						/>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="grid gap-4 sm:grid-cols-3">
// 				<Stat label="Orders" value={String(myOrders.length)} />
// 				<Stat label="Total Spent" value={formatZAR(totalSpent)} />
// 				<Stat label="Member Since" value={mockProfile.memberSince} />
// 			</div>

// 			<button
// 				onClick={onSeeOrders}
// 				className="w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground"
// 			>
// 				View Order History
// 			</button>
// 		</div>
// 	)
// }

export default Account
