import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '../../firebase/firestore.service'
import type { ProductItem } from '../types/Product.type'
import {
  PRODUCT_ACTIONS,
  requestProductByProductNoLoading,
  requestProductItemsLoading,
  setProductByProductNo,
  setProductItems
} from '../actions/Product.action'
import { addSystemNotification } from '../actions/Notification.action'

function* handleProductItemsRequest() {
  yield put(requestProductItemsLoading(true))

  try {
    const items: ProductItem[] = yield call(
      [firestoreService, firestoreService.getAll],
      'Products',
      []
    )

    yield put(setProductItems(items))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to Retrieve Product Data'
    yield put(addSystemNotification({ type: 'error', title: "Products", message: message }))
  } finally {
    yield put(requestProductItemsLoading(false))
  }
}

function* handleProductByProductNoRequest(action: { type: string; payload: string }) {
  yield put(requestProductByProductNoLoading(true))

  try {
    const item: ProductItem = yield call(
      [firestoreService, firestoreService.getById],
      'Products',
      action?.payload
    )

    yield put(setProductByProductNo(item))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to Retrieve Product By Product ID'
    yield put(addSystemNotification({ type: 'error', title: "Product", message: message }))
  } finally {
    yield put(requestProductByProductNoLoading(false))
  }
}

export function* productSaga() {
  yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS, handleProductItemsRequest)
  yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO, handleProductByProductNoRequest)
}
