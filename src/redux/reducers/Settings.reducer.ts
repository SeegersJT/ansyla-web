import { SETTINGS_ACTIONS } from "../actions/Settings.action";
import type { Settings, SettingsState } from "../types/Settings.type";

const initialState: SettingsState = {
  settingsData: [],
  settingsDataLoading: false,
}

type Action = { type: string; payload?: unknown }

export const SettingsReducer = (state = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case SETTINGS_ACTIONS.REQUEST_SETTINGS_ITEMS_LOADING:
      return {
        ...state,
        settingsDataLoading: action.payload as boolean,
      }

    case SETTINGS_ACTIONS.SET_SETTINGS_ITEMS:
      return {
        ...state,
        settingsData: action.payload as Settings[],
      }

    default:
      return state
  }
}
