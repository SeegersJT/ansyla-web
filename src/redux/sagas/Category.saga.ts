import { call, put, takeLatest } from "redux-saga/effects"
import { firestoreService } from "@/firebase"
import type { CategoryItem } from "../types/Category.type"
import { CATEGORY_ACTIONS, requestCategoryItemsLoading, setCategoryItems } from "../actions/Category.action"
import { addSystemNotification } from "../actions/Notification.action"

function* handleCategoryItemsRequest() {
  yield put(requestCategoryItemsLoading(true))

  try {
    const items: CategoryItem[] = yield call(
      [firestoreService, firestoreService.getAll],
      'Categories',
      [firestoreService.orderBy('category_sequence', 'asc')]
    )

    yield put(setCategoryItems(items))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to Retrieve Category Data'
    yield put(addSystemNotification({type: 'error', title: "Categories", message: message}))
  } finally {
    yield put(requestCategoryItemsLoading(false))
  }

}

export function* categorySaga() {
  yield takeLatest(CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS, handleCategoryItemsRequest)
}
