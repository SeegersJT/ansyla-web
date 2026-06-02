import { all } from 'redux-saga/effects'
import { notificationSaga } from './Notification.saga'
import { productSaga } from './Product.saga'

export function* RootSaga() {
  yield all([
    notificationSaga(),
    productSaga(),
  ])
}
