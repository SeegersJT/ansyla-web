import Overview from '@/components/landing-page/dashboard/admin/overview/Overview.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestCustomerItems } from '@/redux/actions/Customer.action'
import { requestOrderItems } from '@/redux/actions/Order.action'
import { requestProductItems } from '@/redux/actions/Product.action'
import { useEffect } from 'react'

function AdminOverviewContainer() {
	const dispatch = useAppDispatch()

	const { productData } = useAppSelector(state => state.product)
	const { orderData } = useAppSelector(state => state.order)
	const { customerData } = useAppSelector(state => state.customer)
	const { settingsData } = useAppSelector(state => state.settings)

	useEffect(() => {
		dispatch(requestProductItems())
		dispatch(requestOrderItems())
		dispatch(requestCustomerItems())
	}, [dispatch])

	const revenue = orderData.reduce((total, order) => total + order.total, 0)
	const lowStockProducts = productData.filter(product => (product?.stock ?? 0) <= 3)

	return (
		<Overview
			productCount={productData.length}
			orderCount={orderData.length}
			customerCount={customerData.length}
			revenue={revenue}
			currency={settingsData[0]?.currency}
			lowStockProducts={lowStockProducts}
		/>
	)
}

export default AdminOverviewContainer
