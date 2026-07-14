import Overview from '@/components/landing-page/dashboard/account/overview/Overview.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestMyOrderItems } from '@/redux/actions/Order.action'
import { useEffect } from 'react'

function OverviewContainer() {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)
	const { myOrderData, myOrderDataLoading } = useAppSelector(state => state.order)

	useEffect(() => {
		if (!user) return

		dispatch(requestMyOrderItems(user.uid))
	}, [dispatch, user])

	const totalSpent = myOrderData.reduce((total, order) => total + order.total, 0)

	return (
		<Overview
			userDetails={user?.user_details ?? null}
			orders={myOrderData}
			ordersLoading={myOrderDataLoading}
			orderCount={myOrderData.length}
			totalSpent={totalSpent}
		/>
	)
}

export default OverviewContainer
