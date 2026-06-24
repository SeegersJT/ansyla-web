import { accountTabs } from '@/containers/landing-page/dashboard/account/Account.helper'
import type { AuthUser } from '@/redux/types/auth.type'
import { LogOut, ShieldCheck } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

function Account({ user }: { user: AuthUser | null }) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
				<div>
					<p className="text-xs uppercase tracking-luxe text-primary">My Account</p>
					<h1 className="mt-2 font-serif text-4xl">Hello, {user?.displayName}</h1>
				</div>
				<div className="flex items-center gap-3">
					<button className="flex items-center gap-2 border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:text-secondary hover:bg-primary">
						<ShieldCheck className="h-4 w-4" /> Admin
					</button>
					<button className="flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary">
						<LogOut className="h-4 w-4" /> Logout
					</button>
				</div>
			</div>

			<div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
				<nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
					{accountTabs.map(({ path, label, icon: Icon }) => (
						<NavLink
							key={path}
							to={path}
							className={({ isActive }) =>
								`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
									isActive
										? 'bg-gradient-gold text-primary-foreground'
										: 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
								}`
							}
						>
							<Icon className="h-4 w-4" /> {label}
						</NavLink>
					))}
				</nav>

				<div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Account
