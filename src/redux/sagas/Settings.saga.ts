import { call, put, takeLatest } from 'redux-saga/effects'
import { firestoreService } from '@/firebase'
import type { Settings, SettingsPrefix, SettingsSequence } from '../types/Settings.type'
import {
	requestSettings,
	requestSettingsLoading,
	requestUpdateSettingsLoading,
	setSettings,
	SETTINGS_ACTIONS,
} from '../actions/Settings.action'
import { addSystemNotification } from '../actions/Notification.action'
import { Utils } from '@/utils/Utils'

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

function* handleUpdateSettingsRequest(action: {
	type: string
	payload: { id: string; payload: Partial<Settings> }
}) {
	yield put(requestUpdateSettingsLoading(true))

	try {
		yield call(
			[firestoreService, firestoreService.update],
			'Settings',
			action.payload.id,
			action.payload.payload
		)

		yield put(requestSettings())
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Settings',
				message: 'Settings updated successfully',
			})
		)
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to Update Settings'
		yield put(addSystemNotification({ type: 'error', title: 'Settings', message: message }))
	} finally {
		yield put(requestUpdateSettingsLoading(false))
	}
}

export function* getNextIdentifier(
	sequenceKey: keyof SettingsSequence,
	prefixKey: keyof SettingsPrefix
) {
	const settingsList: Settings[] = yield call(
		[firestoreService, firestoreService.getAll],
		'Settings',
		[]
	)
	const settings = settingsList[0]

	if (!settings) return { identifier: Utils.generateIdentifier(null, 1), sequence: 1 }

	const currentSequence = settings.sequences?.[0]?.[sequenceKey] ?? 0
	const nextSequence = currentSequence + 1
	const prefix = settings.prefixes?.[prefixKey] ?? null

	const updatedSequences: SettingsSequence[] = [
		{ ...settings.sequences[0], [sequenceKey]: nextSequence },
	]

	yield call([firestoreService, firestoreService.update], 'Settings', settings.id, {
		sequences: updatedSequences,
	})

	return { identifier: Utils.generateIdentifier(prefix, nextSequence), sequence: nextSequence }
}

export function* settingsSaga() {
	yield takeLatest(SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS, handleSettingsRequest)
	yield takeLatest(SETTINGS_ACTIONS.REQUEST_UPDATE_SETTINGS, handleUpdateSettingsRequest)
}
