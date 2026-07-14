import Orders from '@/components/landing-page/dashboard/account/orders/Orders.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestCancelOrder, requestMyOrderItems } from '@/redux/actions/Order.action'
import type { OrderItem } from '@/redux/types/Order.type'
import { useEffect, useState } from 'react'

function OrdersContainer() {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)
	const { myOrderData, myOrderDataLoading, cancelOrderLoading } = useAppSelector(
		state => state.order
	)
	const { settingsData } = useAppSelector(state => state.settings)
	const { productData } = useAppSelector(state => state.product)

	const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

	useEffect(() => {
		if (!user) return

		dispatch(requestMyOrderItems(user.uid))
	}, [dispatch, user])

	useEffect(() => {
		if (!selectedOrder) return

		const refreshed = myOrderData.find(order => order.id === selectedOrder.id)
		if (refreshed) setSelectedOrder(refreshed)
	}, [myOrderData, selectedOrder])

	const handleOnViewOrderClick = (order: OrderItem) => {
		setSelectedOrder(order)
	}

	const handleOnCloseDetailClick = () => {
		setSelectedOrder(null)
	}

	const handleOnCancelOrderClick = (order: OrderItem) => {
		dispatch(requestCancelOrder({ order, actor: 'customer' }))
	}

	return (
		<Orders
			orders={myOrderData}
			products={productData}
			loading={myOrderDataLoading}
			statusOptions={settingsData[0]?.statuses ?? []}
			selectedOrder={selectedOrder}
			cancelling={cancelOrderLoading}
			onViewOrderClick={handleOnViewOrderClick}
			onCloseDetailClick={handleOnCloseDetailClick}
			onCancelOrderClick={handleOnCancelOrderClick}
		/>
	)
}

export default OrdersContainer
