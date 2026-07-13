import { eventChannel, type Task } from 'redux-saga'
import { authService, firestoreService } from '@/firebase'
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects'
import { addSystemNotification } from '../actions/Notification.action'
import type { AuthUser, AuthUserDetails, LoginCredentials } from '../types/auth.type'
import {
	AUTH_ACTIONS,
	requestFirebaseEmailLoginLoading,
	requestAuthUserDetailsLoading,
	setErrorMessage,
	setAuthUser,
	setAuthUserDetails,
	setInitialized,
	requestLogoutLoading,
} from '../actions/auth.action'
import type { User } from 'firebase/auth'
import { navigate } from '@/utils/Navigator'
import { clearWishlistItems, requestWishlistItems } from '../actions/Wishlist.action'

const convertToAuthUser = (user: User): AuthUser => ({
	uid: user.uid,
	email: user.email,
	displayName: user.displayName,
	photoURL: user.photoURL,
	emailVerified: user.emailVerified,
	user_details: null,
})

const SIGNED_OUT = Symbol('SIGNED_OUT')

function createAuthChannel() {
	return eventChannel<User | typeof SIGNED_OUT>(emit => {
		const unsubscribe = authService.onAuthStateChanged(user => emit(user ?? SIGNED_OUT))
		return unsubscribe
	})
}

function* fetchAuthUserDetails(uid: string) {
	yield put(requestAuthUserDetailsLoading(true))

	try {
		const details: AuthUserDetails | null = yield call(
			firestoreService.getById<AuthUserDetails>,
			'Users',
			uid
		)

		yield put(setAuthUserDetails(details))
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to load user details'
		yield put(setErrorMessage(message))
	} finally {
		yield put(requestAuthUserDetailsLoading(false))
	}
}

function* watchAuthState() {
	const channel: ReturnType<typeof createAuthChannel> = yield call(createAuthChannel)

	try {
		while (true) {
			const user: User | typeof SIGNED_OUT = yield take(channel)

			if (user === SIGNED_OUT) {
				yield put(setAuthUser(null))
				yield put(clearWishlistItems())
			} else {
				yield put(setAuthUser(convertToAuthUser(user)))
				yield call(fetchAuthUserDetails, user.uid)
				yield put(requestWishlistItems(user.uid))
			}

			yield put(setInitialized(true))
		}
	} finally {
		channel.close()
	}
}

function* handleFirebaseEmailLoginRequest(action: { type: string; payload: LoginCredentials }) {
	yield put(requestFirebaseEmailLoginLoading(true))

	try {
		const user: User = yield call([authService, authService.login], action.payload)
		yield put(setAuthUser(convertToAuthUser(user)))
		yield call(fetchAuthUserDetails, user.uid)
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Login',
				message: 'Successfully Logged into ANSYLA Jewels',
			})
		)
		yield call(navigate, '/dashboard/account')
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Login failed'
		yield put(setErrorMessage(message))
		yield put(
			addSystemNotification({
				type: 'error',
				title: 'Login',
				message: 'Failed to Log into Ansyla Jewels',
			})
		)
	} finally {
		yield put(requestFirebaseEmailLoginLoading(false))
	}
}

function* handleLogoutRequest() {
	yield put(requestLogoutLoading(true))

	try {
		yield call([authService, authService.logout])
		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Logout',
				message: 'Successfully Logged out of ANSYLA Jewels',
			})
		)
		yield call(navigate, '/dashboard')
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Logout failed'
		yield put(setErrorMessage(message))
		yield put(
			addSystemNotification({
				type: 'error',
				title: 'Logout',
				message: 'Failed to Log out of Ansyla Jewels',
			})
		)
	} finally {
		yield put(requestLogoutLoading(false))
	}
}

export function* authSaga() {
	const authStateTask: Task = yield fork(watchAuthState)

	yield takeLatest(AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_LOGIN, handleFirebaseEmailLoginRequest)
	yield takeLatest(AUTH_ACTIONS.REQUEST_LOGOUT, handleLogoutRequest)

	yield take('@@UNMOUNT')
	yield cancel(authStateTask)
}
