import { eventChannel, type Task } from 'redux-saga'
import { authService } from '@/firebase'
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects'
import { addSystemNotification } from '../actions/Notification.action'
import type { AuthUser, LoginCredentials } from '../types/auth.type'
import {
	AUTH_ACTIONS,
	requestFirebaseEmailLoginLoading,
	setErrorMessage,
	setAuthUser,
	setInitialized,
} from '../actions/auth.action'
import type { User } from 'firebase/auth'

const convertToAuthUser = (user: User): AuthUser => ({
	uid: user.uid,
	email: user.email,
	displayName: user.displayName,
	photoURL: user.photoURL,
	emailVerified: user.emailVerified,
})

const SIGNED_OUT = Symbol('SIGNED_OUT')

function createAuthChannel() {
	return eventChannel<User | typeof SIGNED_OUT>(emit => {
		const unsubscribe = authService.onAuthStateChanged(user => emit(user ?? SIGNED_OUT))
		return unsubscribe
	})
}

function* watchAuthState() {
	const channel: ReturnType<typeof createAuthChannel> = yield call(createAuthChannel)

	try {
		while (true) {
			const user: User | typeof SIGNED_OUT = yield take(channel)
			yield put(setAuthUser(user === SIGNED_OUT ? null : convertToAuthUser(user)))
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
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Login failed'
		yield put(setErrorMessage(message))
		yield put(addSystemNotification({ type: 'error', title: 'Login', message }))
	} finally {
		yield put(requestFirebaseEmailLoginLoading(false))
	}
}

export function* authSaga() {
	const authStateTask: Task = yield fork(watchAuthState)

	yield takeLatest(AUTH_ACTIONS.REQUEST_FIREBASE_EMAIL_LOGIN, handleFirebaseEmailLoginRequest)

	yield take('@@UNMOUNT')
	yield cancel(authStateTask)
}
