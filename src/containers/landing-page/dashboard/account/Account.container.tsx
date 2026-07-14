import Account from '@/components/landing-page/dashboard/account/Account.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestAuthUserDetails, requestLogout } from '@/redux/actions/Authentication.action'
import { useEffect } from 'react'

function AccountContainer() {
	const dispatch = useAppDispatch()

	const { user, logoutLoading } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (user === null) return

		dispatch(requestAuthUserDetails(user.uid))
	}, [dispatch, user])

	const handleOnLogoutClick = () => {
		dispatch(requestLogout())
	}

	return (
		<>
			<Account
				user={user}
				logoutLoading={logoutLoading}
				onLogoutClick={handleOnLogoutClick}
			/>
		</>
	)
}

export default AccountContainer
