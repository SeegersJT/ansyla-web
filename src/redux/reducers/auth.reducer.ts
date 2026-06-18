import { AUTH_ACTIONS } from '../actions/auth.action'
import type { AuthState, AuthUser } from '../types/auth.type'

const initialState: AuthState = {
	user: null,
	initialized: false,
	loading: false,
	error: null,
}

type Action = { type: string; payload?: unknown }

export const AuthReducer = (state = initialState, action: Action): AuthState => {
	switch (action.type) {
		case AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_LOGIN_LOADING:
			return {
				...state,
				loading: action.payload as boolean,
			}

		case AUTH_ACTIONS.SET_AUTH_USER:
			return {
				...state,
				user: action.payload as AuthUser | null,
			}

		case AUTH_ACTIONS.SET_INITIALIZED:
			return {
				...state,
				initialized: action.payload as boolean,
			}

		case AUTH_ACTIONS.SET_ERROR_MESSAGE:
			return {
				...state,
				error: action.payload as string | null,
			}

		default:
			return state
	}
}
