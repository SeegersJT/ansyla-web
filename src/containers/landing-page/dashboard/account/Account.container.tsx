import Account from '@/components/landing-page/dashboard/account/Account.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestAuthUserDetails } from '@/redux/actions/auth.action'
import { useEffect } from 'react'

function AccountContainer() {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (user === null) return

		dispatch(requestAuthUserDetails(user.uid))
	}, [dispatch, user])

	return (
		<>
			<Account user={user} />
		</>
	)
}

export default AccountContainer
