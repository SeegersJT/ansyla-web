import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

function AdminProtectRoute() {
	const { initialized, detailsLoading, user } = useAppSelector(state => state.auth)

	if (!initialized || detailsLoading) return null

	if (!user || user.user_details?.role !== 'admin') {
		return <Navigate to="/dashboard/account" replace />
	}

	return <Outlet />
}

export default AdminProtectRoute
