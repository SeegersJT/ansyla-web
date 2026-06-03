import { combineReducers } from 'redux'
import { notificationReducer } from './Notification.reducer'
import { ProductReducer } from './Product.reducer'
import { CategoryReducer } from './Category.reducer'
import { SettingsReducer } from './Settings.reducer'

export const RootReducer = combineReducers({
  system: combineReducers({
    notifications: notificationReducer
  }),
  settings: SettingsReducer,
  category: CategoryReducer,
  product: ProductReducer,
})
