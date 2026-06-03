import { all } from 'redux-saga/effects'
import { notificationSaga } from './Notification.saga'
import { categorySaga } from './Category.saga'
import { productSaga } from './Product.saga'
import { settingsSaga } from './Settings.saga'

export function* RootSaga() {
  yield all([
    notificationSaga(),
    settingsSaga(),
    categorySaga(),
    productSaga(),
  ])
}
