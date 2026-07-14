import type {
	AuthUser,
	AuthUserDetails,
	LoginCredentials,
	RegisterCredentials,
} from '../types/Authenticated.type'

export const AUTH_ACTIONS = {
	REQUEST_FIREBASE_EMAIL_LOGIN: '[AUTH] - FIREBASE EMAIL LOGIN - REQUEST',
	REQUEST_FIREBASE_EMAIL_LOGIN_LOADING: '[AUTH] - FIREBASE EMAIL LOGIN - REQUEST - LOADING',

	REQUEST_FIREBASE_EMAIL_REGISTER: '[AUTH] - FIREBASE EMAIL REGISTER - REQUEST',
	REQUEST_FIREBASE_EMAIL_REGISTER_LOADING: '[AUTH] - FIREBASE EMAIL REGISTER - REQUEST_LOADING',

	REQUEST_LOGOUT: '[AUTH] - LOGOUT - REQUEST',
	REQUEST_LOGOUT_LOADING: '[AUTH] - LOGOUT - REQUEST - LOADING',

	SET_AUTH_USER: '[AUTH] - AUTH USER - SET',
	SET_INITIALIZED: '[AUTH] - INITIALIZED - SET',
	SET_ERROR_MESSAGE: '[AUTH] - ERROR MESSAGE - SET',

	REQUEST_AUTH_USER_DETAILS: '[AUTH] - AUTH USER DETAILS - REQUEST',
	REQUEST_AUTH_USER_DETAILS_LOADING: '[AUTH] - AUTH USER DETAILS - REQUEST - LOADING',
	SET_AUTH_USER_DETAILS: '[AUTH] - AUTH USER DETAILS - SET',
} as const

export const requestFirebaseEmailLogin = (payload: LoginCredentials) => ({
	type: AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_LOGIN,
	payload,
})

export const requestFirebaseEmailLoginLoading = (loading: boolean) => ({
	type: AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_LOGIN_LOADING,
	payload: loading,
})

export const requestFirebaseEmailRegister = (payload: RegisterCredentials) => ({
	type: AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_REGISTER,
	payload: payload,
})

export const requestFirebaseEmailRegisterLoading = (loading: boolean) => ({
	type: AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_REGISTER_LOADING,
	payload: loading,
})

export const setAuthUser = (user: AuthUser | null) => ({
	type: AUTH_ACTIONS.SET_AUTH_USER,
	payload: user,
})

export const setInitialized = (initialized: boolean) => ({
	type: AUTH_ACTIONS.SET_INITIALIZED,
	payload: initialized,
})

export const setErrorMessage = (message: string) => ({
	type: AUTH_ACTIONS.SET_ERROR_MESSAGE,
	payload: message,
})

export const requestAuthUserDetails = (uid: string) => ({
	type: AUTH_ACTIONS.REQUEST_AUTH_USER_DETAILS,
	payload: uid,
})

export const requestAuthUserDetailsLoading = (loading: boolean) => ({
	type: AUTH_ACTIONS.REQUEST_AUTH_USER_DETAILS_LOADING,
	payload: loading,
})

export const setAuthUserDetails = (userDetails: AuthUserDetails | null) => ({
	type: AUTH_ACTIONS.SET_AUTH_USER_DETAILS,
	payload: userDetails,
})

export const requestLogout = () => ({
	type: AUTH_ACTIONS.REQUEST_LOGOUT,
})

export const requestLogoutLoading = (loading: boolean) => ({
	type: AUTH_ACTIONS.REQUEST_LOGOUT_LOADING,
	payload: loading,
})
