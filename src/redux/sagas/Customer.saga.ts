import { call, put, select, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { AuthUserDetails } from '../types/Authentication.type'
import type { OrderItem } from '../types/Order.type'
import type { CustomerItem } from '../types/Customer.type'
import type { Settings } from '../types/Settings.type'
import type { RootState } from '../store'
import {
	CUSTOMER_ACTIONS,
	requestCustomerItemsLoading,
	setCustomerItems,
} from '../actions/Customer.action'
import { addSystemNotification } from '../actions/Notification.action'
import { Utils } from '@/utils/Utils'

function* handleCustomerItemsRequest() {
	yield put(requestCustomerItemsLoading(true))

	try {
		const users: AuthUserDetails[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Users',
			[]
		)

		const orders: OrderItem[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Orders',
			[]
		)

		const settings: Settings | undefined = yield select(
			(state: RootState) => state.settings.settingsData[0]
		)

		const customers: CustomerItem[] = users
			.filter(user => user.role !== 'admin')
			.map(user => {
				const userOrders = orders.filter(
					order => order.customer_email === user.email_address
				)
				const paidOrders = userOrders.filter(Utils.isPaidOrder)
				const spent = paidOrders.reduce((total, order) => total + order.total, 0)
				const loyalty = Utils.calculateLoyalty(spent, settings)

				return {
					id: user.id,
					name: `${user.first_name} ${user.last_name}`.trim(),
					email: user.email_address,
					phone: user.phone_number ?? '',
					orders: userOrders.length,
					spent,
					tier: loyalty.tier,
					points: loyalty.points,
				}
			})
			.sort((a, b) => b.spent - a.spent)

		yield put(setCustomerItems(customers))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Customer Data'
		yield put(addSystemNotification({ type: 'error', title: 'Customers', message: message }))
	} finally {
		yield put(requestCustomerItemsLoading(false))
	}
}

export function* customerSaga() {
	yield takeLatest(CUSTOMER_ACTIONS.REQUEST_CUSTOMER_ITEMS, handleCustomerItemsRequest)
}
