import Orders from '@/components/landing-page/dashboard/admin/orders/Orders.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestOrderItems, requestUpdateOrderStatus } from '@/redux/actions/Order.action'
import { useEffect, useMemo } from 'react'

function AdminOrdersContainer() {
	const dispatch = useAppDispatch()

	const { orderData, orderDataLoading } = useAppSelector(state => state.order)
	const { settingsData } = useAppSelector(state => state.settings)

	useEffect(() => {
		dispatch(requestOrderItems())
	}, [dispatch])

	const sortedOrders = useMemo(
		() =>
			[...orderData].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
		[orderData]
	)

	const statusOptions = settingsData[0]?.statuses ?? []

	const handleOnStatusChange = (id: string, status: string) => {
		dispatch(requestUpdateOrderStatus(id, status))
	}

	return (
		<Orders
			orders={sortedOrders}
			loading={orderDataLoading}
			statusOptions={statusOptions}
			onStatusChange={handleOnStatusChange}
		/>
	)
}

export default AdminOrdersContainer
