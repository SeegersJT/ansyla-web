import Customers from '@/components/landing-page/dashboard/admin/customers/Customers.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestCustomerItems } from '@/redux/actions/Customer.action'
import { useEffect } from 'react'

function AdminCustomersContainer() {
	const dispatch = useAppDispatch()

	const { customerData, customerDataLoading } = useAppSelector(state => state.customer)

	useEffect(() => {
		dispatch(requestCustomerItems())
	}, [dispatch])

	return <Customers customers={customerData} loading={customerDataLoading} />
}

export default AdminCustomersContainer
