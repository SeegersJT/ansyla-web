import Orders from '@/components/landing-page/dashboard/account/orders/Orders.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestMyOrderItems } from '@/redux/actions/Order.action'
import type { OrderItem } from '@/redux/types/Order.type'
import { useEffect, useState } from 'react'

function OrdersContainer() {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)
	const { myOrderData, myOrderDataLoading } = useAppSelector(state => state.order)

	const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

	useEffect(() => {
		if (!user) return

		dispatch(requestMyOrderItems(user.uid))
	}, [dispatch, user])

	const handleOnViewOrderClick = (order: OrderItem) => {
		setSelectedOrder(order)
	}

	const handleOnCloseDetailClick = () => {
		setSelectedOrder(null)
	}

	return (
		<Orders
			orders={myOrderData}
			loading={myOrderDataLoading}
			selectedOrder={selectedOrder}
			onViewOrderClick={handleOnViewOrderClick}
			onCloseDetailClick={handleOnCloseDetailClick}
		/>
	)
}

export default OrdersContainer
