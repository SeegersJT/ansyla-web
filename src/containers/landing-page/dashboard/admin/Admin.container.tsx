import Admin from '@/components/landing-page/dashboard/admin/Admin.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestLogout } from '@/redux/actions/auth.action'
import { adminTabs } from './Admin.helper'

function AdminContainer() {
	const dispatch = useAppDispatch()

	const { user, logoutLoading } = useAppSelector(state => state.auth)

	const handleOnLogoutClick = () => {
		dispatch(requestLogout())
	}

	return (
		<Admin
			user={user}
			adminTabs={adminTabs}
			logoutLoading={logoutLoading}
			onLogoutClick={handleOnLogoutClick}
		/>
	)
}

export default AdminContainer
