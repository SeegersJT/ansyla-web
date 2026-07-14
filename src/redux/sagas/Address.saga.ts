import { call, put, select, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { AddressItem } from '../types/Address.type'
import type { RootState } from '../types/Root.type'
import {
	ADDRESS_ACTIONS,
	requestAddAddressLoading,
	requestAddressItems,
	requestAddressItemsLoading,
	requestRemoveAddressLoading,
	requestUpdateAddressLoading,
	setAddressItems,
} from '../actions/Address.action'
import { addSystemNotification } from '../actions/Notification.action'

function* handleAddressItemsRequest(action: { type: string; payload: string }) {
	yield put(requestAddressItemsLoading(true))

	try {
		const addresses: AddressItem[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Addresses',
			[firestoreService.where('user_id', '==', action.payload)]
		)

		yield put(setAddressItems(addresses))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Addresses'
		yield put(addSystemNotification({ type: 'error', title: 'Addresses', message: message }))
	} finally {
		yield put(requestAddressItemsLoading(false))
	}
}

function* unsetOtherDefaultAddresses(excludeId?: string) {
	const existing: AddressItem[] = yield select((state: RootState) => state.address.addressData)
	const others = existing.filter(address => address.is_default && address.id !== excludeId)

	for (const address of others) {
		yield call([firestoreService, firestoreService.update], 'Addresses', address.id, {
			is_default: false,
		})
	}
}

function* handleAddAddressRequest(action: {
	type: string
	payload: Omit<AddressItem, 'id' | 'user_id'>
}) {
	const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)
	if (!uid) return

	yield put(requestAddAddressLoading(true))

	try {
		const existing: AddressItem[] = yield select(
			(state: RootState) => state.address.addressData
		)
		const isFirstAddress = existing.length === 0

		if (action.payload.is_default || isFirstAddress) {
			yield call(unsetOtherDefaultAddresses)
		}

		yield call([firestoreService, firestoreService.add], 'Addresses', {
			...action.payload,
			user_id: uid,
			is_default: action.payload.is_default || isFirstAddress,
		})

		yield put(requestAddressItems(uid))
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Addresses',
				message: 'Address saved successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Save Address'
		yield put(addSystemNotification({ type: 'error', title: 'Addresses', message: message }))
	} finally {
		yield put(requestAddAddressLoading(false))
	}
}

function* handleUpdateAddressRequest(action: {
	type: string
	payload: { id: string; payload: Partial<AddressItem> }
}) {
	const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)
	if (!uid) return

	yield put(requestUpdateAddressLoading(true))

	try {
		if (action.payload.payload.is_default) {
			yield call(unsetOtherDefaultAddresses, action.payload.id)
		}

		yield call(
			[firestoreService, firestoreService.update],
			'Addresses',
			action.payload.id,
			action.payload.payload
		)

		yield put(requestAddressItems(uid))
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Addresses',
				message: 'Address updated successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Address'
		yield put(addSystemNotification({ type: 'error', title: 'Addresses', message: message }))
	} finally {
		yield put(requestUpdateAddressLoading(false))
	}
}

function* handleRemoveAddressRequest(action: { type: string; payload: string }) {
	const uid: string | undefined = yield select((state: RootState) => state.auth.user?.uid)
	if (!uid) return

	yield put(requestRemoveAddressLoading(true))

	try {
		const existing: AddressItem[] = yield select(
			(state: RootState) => state.address.addressData
		)
		const removed = existing.find(address => address.id === action.payload)

		yield call([firestoreService, firestoreService.remove], 'Addresses', action.payload)

		const remaining = existing.filter(address => address.id !== action.payload)

		if (removed?.is_default && remaining.length > 0) {
			yield call([firestoreService, firestoreService.update], 'Addresses', remaining[0].id, {
				is_default: true,
			})
		}

		yield put(requestAddressItems(uid))
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Addresses',
				message: 'Address removed successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Remove Address'
		yield put(addSystemNotification({ type: 'error', title: 'Addresses', message: message }))
	} finally {
		yield put(requestRemoveAddressLoading(false))
	}
}

export function* addressSaga() {
	yield takeLatest(ADDRESS_ACTIONS.REQUEST_ADDRESS_ITEMS, handleAddressItemsRequest)
	yield takeLatest(ADDRESS_ACTIONS.REQUEST_ADD_ADDRESS, handleAddAddressRequest)
	yield takeLatest(ADDRESS_ACTIONS.REQUEST_UPDATE_ADDRESS, handleUpdateAddressRequest)
	yield takeLatest(ADDRESS_ACTIONS.REQUEST_REMOVE_ADDRESS, handleRemoveAddressRequest)
}
