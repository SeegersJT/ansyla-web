export interface AuthUser {
	uid: string
	email: string | null
	displayName: string | null
	photoURL: string | null
	emailVerified: boolean
}

export interface AuthState {
	user: AuthUser | null
	initialized: boolean
	loading: boolean
	error: string | null
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials {
	fullName: string
	email: string
	password: string
}
