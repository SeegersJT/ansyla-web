import Orders from '@/components/landing-page/dashboard/admin/orders/Orders.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestMarkOrderAsPaid,
	requestOrderItems,
	requestUpdateOrderStatus,
} from '@/redux/actions/Order.action'
import type { OrderItem } from '@/redux/types/Order.type'
import { useEffect, useMemo, useState } from 'react'

function AdminOrdersContainer() {
	const dispatch = useAppDispatch()

	const { orderData, orderDataLoading, markOrderAsPaidLoading } = useAppSelector(
		state => state.order
	)
	const { settingsData } = useAppSelector(state => state.settings)

	const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

	useEffect(() => {
		dispatch(requestOrderItems())
	}, [dispatch])

	useEffect(() => {
		if (!selectedOrder) return

		const refreshed = orderData.find(order => order.id === selectedOrder.id)
		if (refreshed) setSelectedOrder(refreshed)
	}, [orderData, selectedOrder])

	const sortedOrders = useMemo(
		() => [...orderData].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))),
		[orderData]
	)

	const statusOptions = settingsData[0]?.statuses ?? []

	const handleOnStatusChange = (id: string, status: string) => {
		dispatch(requestUpdateOrderStatus(id, status))
	}

	const handleOnViewOrderClick = (order: OrderItem) => {
		setSelectedOrder(order)
	}

	const handleOnCloseDetailClick = () => {
		setSelectedOrder(null)
	}

	const handleOnMarkAsPaidClick = (id: string) => {
		dispatch(requestMarkOrderAsPaid(id))
	}

	return (
		<Orders
			orders={sortedOrders}
			loading={orderDataLoading}
			statusOptions={statusOptions}
			selectedOrder={selectedOrder}
			markingAsPaid={markOrderAsPaidLoading}
			onStatusChange={handleOnStatusChange}
			onViewOrderClick={handleOnViewOrderClick}
			onCloseDetailClick={handleOnCloseDetailClick}
			onMarkAsPaidClick={handleOnMarkAsPaidClick}
		/>
	)
}

export default AdminOrdersContainer
