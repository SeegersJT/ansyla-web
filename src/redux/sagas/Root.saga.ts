import { all } from 'redux-saga/effects'
import { notificationSaga } from './Notification.saga'
import { categorySaga } from './Category.saga'
import { productSaga } from './Product.saga'
import { settingsSaga } from './Settings.saga'
import { newsletterSaga } from './Newsletter.saga'
import { couponSaga } from './Coupon.saga'
import { authSaga } from './auth.saga'

export function* RootSaga() {
	yield all([
		notificationSaga(),
		authSaga(),
		settingsSaga(),
		newsletterSaga(),
		categorySaga(),
		productSaga(),
		couponSaga(),
	])
}
