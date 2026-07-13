import type { Settings } from '../types/Settings.type'

export const SETTINGS_ACTIONS = {
	REQUEST_SETTINGS_ITEMS: '[SETTINGS] - SETTINGS TYPES - REQUEST',
	REQUEST_SETTINGS_ITEMS_LOADING: '[SETTINGS] - SETTINGS TYPES - REQUEST - LOADING',
	SET_SETTINGS_ITEMS: '[SETTINGS] - SETTINGS TYPES - SET',

	REQUEST_UPDATE_SETTINGS: '[SETTINGS] - UPDATE SETTINGS - REQUEST',
	REQUEST_UPDATE_SETTINGS_LOADING: '[SETTINGS] - UPDATE SETTINGS - REQUEST - LOADING',
} as const

export const requestSettings = () => ({
	type: SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS,
})

export const requestSettingsLoading = (loading: boolean) => ({
	type: SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS_LOADING,
	payload: loading,
})

export const setSettings = (payload: Settings[]) => ({
	type: SETTINGS_ACTIONS.SET_SETTINGS_ITEMS,
	payload,
})

export const requestUpdateSettings = (id: string, payload: Partial<Settings>) => ({
	type: SETTINGS_ACTIONS.REQUEST_UPDATE_SETTINGS,
	payload: { id, payload },
})

export const requestUpdateSettingsLoading = (loading: boolean) => ({
	type: SETTINGS_ACTIONS.REQUEST_UPDATE_SETTINGS_LOADING,
	payload: loading,
})
