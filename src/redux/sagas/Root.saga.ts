import { all } from 'redux-saga/effects'
import { notificationSaga } from './Notification.saga'
import { categorySaga } from './Category.saga'
import { productSaga } from './Product.saga'
import { settingsSaga } from './Settings.saga'
import { newsletterSaga } from './Newsletter.saga'
import { couponSaga } from './Coupon.saga'
import { orderSaga } from './Order.saga'
import { customerSaga } from './Customer.saga'
import { wishlistSaga } from './Wishlist.saga'
import { reviewSaga } from './Review.saga'
import { authSaga } from './Authentication.saga'
import { addressSaga } from './Address.saga'

export function* RootSaga() {
	yield all([
		notificationSaga(),
		authSaga(),
		settingsSaga(),
		newsletterSaga(),
		categorySaga(),
		productSaga(),
		couponSaga(),
		orderSaga(),
		customerSaga(),
		wishlistSaga(),
		reviewSaga(),
		addressSaga(),
	])
}
