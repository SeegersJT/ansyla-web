import { combineReducers } from 'redux'
import { notificationReducer } from './Notification.reducer'
import { ProductReducer } from './Product.reducer'
import { CategoryReducer } from './Category.reducer'
import { SettingsReducer } from './Settings.reducer'
import { NewsLetterReducer } from './Newsletter.reduce'
import { CartReducer } from './Cart.reducer'
import { CouponReducer } from './Coupon.reducer'

export const RootReducer = combineReducers({
  system: combineReducers({
    notification: notificationReducer
  }),
  settings: SettingsReducer,
  newsletter: NewsLetterReducer,
  category: CategoryReducer,
  product: ProductReducer,
  cart: CartReducer,
  coupon: CouponReducer
})
