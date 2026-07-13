import { combineReducers } from 'redux'
import { notificationReducer } from './Notification.reducer'
import { ProductReducer } from './Product.reducer'
import { CategoryReducer } from './Category.reducer'
import { SettingsReducer } from './Settings.reducer'
import { NewsLetterReducer } from './Newsletter.reduce'
import { CartReducer } from './Cart.reducer'
import { CouponReducer } from './Coupon.reducer'
import { AuthReducer } from './auth.reducer'
import { OrderReducer } from './Order.reducer'
import { CustomerReducer } from './Customer.reducer'
import { WishlistReducer } from './Wishlist.reducer'

export const RootReducer = combineReducers({
	system: combineReducers({
		notification: notificationReducer,
	}),
	auth: AuthReducer,
	settings: SettingsReducer,
	newsletter: NewsLetterReducer,
	category: CategoryReducer,
	product: ProductReducer,
	cart: CartReducer,
	coupon: CouponReducer,
	order: OrderReducer,
	customer: CustomerReducer,
	wishlist: WishlistReducer,
})
