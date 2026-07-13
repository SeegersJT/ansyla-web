import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '../../firebase/firestore.service'
import type { ProductItem } from '../types/Product.type'
import {
	PRODUCT_ACTIONS,
	requestAddProductLoading,
	requestProductByProductNoLoading,
	requestProductItems,
	requestProductItemsLoading,
	requestRemoveProductLoading,
	requestUpdateProductLoading,
	setProductByProductNo,
	setProductItems,
} from '../actions/Product.action'
import { addSystemNotification } from '../actions/Notification.action'
import { getNextIdentifier } from './Settings.saga'

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
		yield put(addSystemNotification({ type: 'error', title: 'Products', message: message }))
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
		const message =
			err instanceof Error ? err.message : 'Failed to Retrieve Product By Product ID'
		yield put(addSystemNotification({ type: 'error', title: 'Product', message: message }))
	} finally {
		yield put(requestProductByProductNoLoading(false))
	}
}

function* handleAddProductRequest(action: { type: string; payload: Omit<ProductItem, 'id'> }) {
	yield put(requestAddProductLoading(true))

	try {
		const { identifier }: { identifier: string; sequence: number } = yield call(
			getNextIdentifier,
			'product_no',
			'product_prefix'
		)

		yield call([firestoreService, firestoreService.add], 'Products', {
			...action.payload,
			product_no: identifier,
		})
		yield put(requestProductItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Products',
				message: 'Product added successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Add Product'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message: message }))
	} finally {
		yield put(requestAddProductLoading(false))
	}
}

function* handleUpdateProductRequest(action: {
	type: string
	payload: { id: string; payload: Partial<ProductItem> }
}) {
	yield put(requestUpdateProductLoading(true))

	try {
		yield call(
			[firestoreService, firestoreService.update],
			'Products',
			action.payload.id,
			action.payload.payload
		)
		yield put(requestProductItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Products',
				message: 'Product updated successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Product'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message: message }))
	} finally {
		yield put(requestUpdateProductLoading(false))
	}
}

function* handleRemoveProductRequest(action: { type: string; payload: string }) {
	yield put(requestRemoveProductLoading(true))

	try {
		yield call([firestoreService, firestoreService.remove], 'Products', action.payload)
		yield put(requestProductItems())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Products',
				message: 'Product removed successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Remove Product'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message: message }))
	} finally {
		yield put(requestRemoveProductLoading(false))
	}
}

export function* productSaga() {
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_ITEMS, handleProductItemsRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_PRODUCT_NO, handleProductByProductNoRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_ADD_PRODUCT, handleAddProductRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_UPDATE_PRODUCT, handleUpdateProductRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_REMOVE_PRODUCT, handleRemoveProductRequest)
}
