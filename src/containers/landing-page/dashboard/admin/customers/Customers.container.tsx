import Customers from '@/components/landing-page/dashboard/admin/customers/Customers.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestCustomerItems } from '@/redux/actions/Customer.action'
import { requestOrderItems } from '@/redux/actions/Order.action'
import { requestSettings } from '@/redux/actions/Settings.action'
import type { CustomerItem } from '@/redux/types/Customer.type'
import type { OrderItem } from '@/redux/types/Order.type'
import { useEffect, useMemo, useState } from 'react'

function AdminCustomersContainer() {
	const dispatch = useAppDispatch()

	const { customerData, customerDataLoading } = useAppSelector(state => state.customer)
	const { orderData } = useAppSelector(state => state.order)
	const { productData } = useAppSelector(state => state.product)

	const [search, setSearch] = useState('')
	const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null)
	const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

	useEffect(() => {
		dispatch(requestSettings())
		dispatch(requestCustomerItems())
		dispatch(requestOrderItems())
	}, [dispatch])

	const filteredCustomers = useMemo(() => {
		const query = search.trim().toLowerCase()
		if (!query) return customerData

		return customerData.filter(
			customer =>
				customer.name.toLowerCase().includes(query) ||
				customer.email.toLowerCase().includes(query)
		)
	}, [customerData, search])

	const customerOrders = useMemo(() => {
		if (!selectedCustomer) return []

		return [...orderData]
			.filter(order => order.customer_email === selectedCustomer.email)
			.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
	}, [orderData, selectedCustomer])

	const handleOnSearchChange = (value: string) => {
		setSearch(value)
	}

	const handleOnViewCustomerClick = (customer: CustomerItem) => {
		setSelectedCustomer(customer)
	}

	const handleOnCloseCustomerDetailClick = () => {
		setSelectedCustomer(null)
	}

	const handleOnViewOrderClick = (order: OrderItem) => {
		setSelectedOrder(order)
	}

	const handleOnCloseOrderDetailClick = () => {
		setSelectedOrder(null)
	}

	return (
		<Customers
			customers={filteredCustomers}
			products={productData}
			loading={customerDataLoading}
			search={search}
			selectedCustomer={selectedCustomer}
			customerOrders={customerOrders}
			selectedOrder={selectedOrder}
			onSearchChange={handleOnSearchChange}
			onViewCustomerClick={handleOnViewCustomerClick}
			onCloseCustomerDetailClick={handleOnCloseCustomerDetailClick}
			onViewOrderClick={handleOnViewOrderClick}
			onCloseOrderDetailClick={handleOnCloseOrderDetailClick}
		/>
	)
}

export default AdminCustomersContainer
