import Orders from '@/components/landing-page/dashboard/admin/orders/Orders.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestCancelOrder,
	requestMarkOrderAsPaid,
	requestOrderItems,
	requestUpdateOrderStatus,
} from '@/redux/actions/Order.action'
import type { OrderItem } from '@/redux/types/Order.type'
import { useEffect, useMemo, useState } from 'react'

function AdminOrdersContainer() {
	const dispatch = useAppDispatch()

	const { orderData, orderDataLoading, markOrderAsPaidLoading, cancelOrderLoading } =
		useAppSelector(state => state.order)
	const { settingsData } = useAppSelector(state => state.settings)
	const { productData } = useAppSelector(state => state.product)

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

	const handleOnCancelOrderClick = (order: OrderItem) => {
		dispatch(requestCancelOrder({ order, actor: 'admin' }))
	}

	return (
		<Orders
			orders={sortedOrders}
			products={productData}
			loading={orderDataLoading}
			statusOptions={statusOptions}
			selectedOrder={selectedOrder}
			markingAsPaid={markOrderAsPaidLoading}
			cancelling={cancelOrderLoading}
			onStatusChange={handleOnStatusChange}
			onViewOrderClick={handleOnViewOrderClick}
			onCloseDetailClick={handleOnCloseDetailClick}
			onMarkAsPaidClick={handleOnMarkAsPaidClick}
			onCancelOrderClick={handleOnCancelOrderClick}
		/>
	)
}

export default AdminOrdersContainer
