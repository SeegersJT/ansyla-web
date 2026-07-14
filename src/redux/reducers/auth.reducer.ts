import { AUTH_ACTIONS } from '../actions/Auth.action'
import type { AuthState, AuthUser, AuthUserDetails } from '../types/Auth.type'

const initialState: AuthState = {
	user: null,
	initialized: false,
	loading: false,
	detailsLoading: false,
	logoutLoading: false,
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

		case AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_REGISTER_LOADING:
			return {
				...state,
				loading: action.payload as boolean,
			}

		case AUTH_ACTIONS.REQUEST_LOGOUT_LOADING:
			return {
				...state,
				logoutLoading: action.payload as boolean,
			}

		case AUTH_ACTIONS.REQUEST_AUTH_USER_DETAILS_LOADING:
			return {
				...state,
				detailsLoading: action.payload as boolean,
			}

		case AUTH_ACTIONS.SET_AUTH_USER:
			return {
				...state,
				user: action.payload as AuthUser | null,
			}

		case AUTH_ACTIONS.SET_AUTH_USER_DETAILS: {
			const user_details = action.payload as AuthUserDetails | null

			return {
				...state,
				user: state.user ? { ...state.user, user_details } : state.user,
			}
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
