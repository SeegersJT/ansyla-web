import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { Settings } from '../types/Settings.type'
import { requestSettingsLoading, setSettings, SETTINGS_ACTIONS } from '../actions/Settings.action'
import { addSystemNotification } from '../actions/Notification.action'

function* handleSettingsRequest() {
	yield put(requestSettingsLoading(true))

	try {
		const items: Settings[] = yield call(
			[firestoreService, firestoreService.getAll],
			'Settings',
			[]
		)

		yield put(setSettings(items))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Retrieve Settings Data'
		yield put(addSystemNotification({ type: 'error', title: 'Settingss', message: message }))
	} finally {
		yield put(requestSettingsLoading(false))
	}
}

export function* settingsSaga() {
	yield takeLatest(SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS, handleSettingsRequest)
}
