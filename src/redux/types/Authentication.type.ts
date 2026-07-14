export interface AuthUserDetails {
	id: string
	user_no: string
	role: string
	role_no: number
	first_name: string
	last_name: string
	email_address: string
	phone_number: string
	tier: string
	tier_updated_at: Date
	total_orders: number
	last_login_at: Date
	createdAt: Date | null
}

export interface AuthUser {
	uid: string
	email: string | null
	displayName: string | null
	photoURL: string | null
	emailVerified: boolean
	user_details: AuthUserDetails | null
}

export interface AuthState {
	user: AuthUser | null
	initialized: boolean
	loading: boolean
	detailsLoading: boolean
	logoutLoading: boolean
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
