import type { Settings } from "../types/Settings.type"

export const SETTINGS_ACTIONS = {
  REQUEST_SETTINGS_ITEMS: '[SETTINGS] - SETTINGS TYPES - REQUEST',
  REQUEST_SETTINGS_ITEMS_LOADING: '[SETTINGS] - SETTINGS TYPES - REQUEST - LOADING',
  SET_SETTINGS_ITEMS: '[SETTINGS] - SETTINGS TYPES - SET'
} as const

export const requestSettings = () => ({
  type: SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS,
})

export const requestSettingsLoading = (loading: boolean) => ({
  type: SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS_LOADING,
  payload: loading
})


export const setSettings = (payload: Settings[]) => ({
  type: SETTINGS_ACTIONS.SET_SETTINGS_ITEMS,
  payload
})