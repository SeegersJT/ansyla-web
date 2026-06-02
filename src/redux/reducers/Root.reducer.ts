import { combineReducers } from 'redux'
import { notificationReducer } from './Notification.reducer'
import { ProductReducer } from './Product.reducer'

export const RootReducer = combineReducers({
  system: combineReducers({
    notifications: notificationReducer
  }),
  product: ProductReducer,
})
