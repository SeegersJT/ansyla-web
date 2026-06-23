import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

function ProtectedRoute() {
	const { initialized, user } = useAppSelector(state => state.auth)

	if (!initialized) return null

	if (!user) return <Navigate to="/dashboard" replace />

	return <Outlet />
}

export default ProtectedRoute
