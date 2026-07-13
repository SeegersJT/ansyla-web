import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { CategoryItem } from '../types/Category.type'
import {
	CATEGORY_ACTIONS,
	requestAddCategoryLoading,
	requestCategoryItems,
	requestCategoryItemsLoading,
	requestRemoveCategoryLoading,
	requestUpdateCategoryLoading,
	setCategoryItems,
} from '../actions/Category.action'
import { addSystemNotification } from '../actions/Notification.action'
import { getNextIdentifier } from './Settings.saga'

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
		yield put(addSystemNotification({ type: 'error', title: 'Categories', message: message }))
	} finally {
		yield put(requestCategoryItemsLoading(false))
	}
}

function* handleAddCategoryRequest(action: {
	type: string
	payload: Omit<CategoryItem, 'id' | 'category_no'>
}) {
	yield put(requestAddCategoryLoading(true))

	try {
		const { identifier }: { identifier: string; sequence: number } = yield call(
			getNextIdentifier,
			'category_no',
			'category_prefix'
		)

		yield call([firestoreService, firestoreService.add], 'Categories', {
			...action.payload,
			category_no: identifier,
		})
		yield put(requestCategoryItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Categories',
				message: 'Category added successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Add Category'
		yield put(addSystemNotification({ type: 'error', title: 'Categories', message: message }))
	} finally {
		yield put(requestAddCategoryLoading(false))
	}
}

function* handleUpdateCategoryRequest(action: {
	type: string
	payload: { id: string; payload: Partial<CategoryItem> }
}) {
	yield put(requestUpdateCategoryLoading(true))

	try {
		yield call(
			[firestoreService, firestoreService.update],
			'Categories',
			action.payload.id,
			action.payload.payload
		)
		yield put(requestCategoryItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Categories',
				message: 'Category updated successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Category'
		yield put(addSystemNotification({ type: 'error', title: 'Categories', message: message }))
	} finally {
		yield put(requestUpdateCategoryLoading(false))
	}
}

function* handleRemoveCategoryRequest(action: { type: string; payload: string }) {
	yield put(requestRemoveCategoryLoading(true))

	try {
		yield call([firestoreService, firestoreService.remove], 'Categories', action.payload)
		yield put(requestCategoryItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Categories',
				message: 'Category removed successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Remove Category'
		yield put(addSystemNotification({ type: 'error', title: 'Categories', message: message }))
	} finally {
		yield put(requestRemoveCategoryLoading(false))
	}
}

export function* categorySaga() {
	yield takeLatest(CATEGORY_ACTIONS.REQUEST_CATEGORY_ITEMS, handleCategoryItemsRequest)
	yield takeLatest(CATEGORY_ACTIONS.REQUEST_ADD_CATEGORY, handleAddCategoryRequest)
	yield takeLatest(CATEGORY_ACTIONS.REQUEST_UPDATE_CATEGORY, handleUpdateCategoryRequest)
	yield takeLatest(CATEGORY_ACTIONS.REQUEST_REMOVE_CATEGORY, handleRemoveCategoryRequest)
}
