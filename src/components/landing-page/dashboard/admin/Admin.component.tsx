import type { AdminTabItem } from '@/containers/landing-page/dashboard/admin/Admin.helper'
import type { AuthUser } from '@/redux/types/Authentication.type'
import { LogOut, User } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'

function Admin({
	user,
	adminTabs,
	logoutLoading,
	onLogoutClick,
}: {
	user: AuthUser | null
	adminTabs: AdminTabItem[]
	logoutLoading: boolean
	onLogoutClick: () => void
}) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
				<div>
					<p className="text-xs uppercase tracking-luxe text-primary">ANSYLA Admin</p>
					<h1 className="mt-2 font-serif text-4xl">Dashboard</h1>
					<p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
				</div>
				<div className="flex items-center gap-3">
					<Link
						to="/dashboard/account"
						className="flex items-center gap-2 border border-primary/40 px-4 py-2 text-xs uppercase tracking-wider text-primary hover:text-secondary hover:bg-primary"
					>
						<User className="h-4 w-4" /> My Account
					</Link>
					<button
						onClick={onLogoutClick}
						disabled={logoutLoading}
						className="flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-60 "
					>
						<LogOut className="h-4 w-4" /> {logoutLoading ? 'Logging out…' : 'Logout'}
					</button>
				</div>
			</div>

			<div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
				<nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
					{adminTabs.map(({ path, label, icon: Icon }) => (
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

				<div className="min-w-0">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Admin
