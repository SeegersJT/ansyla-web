import Authentication from '@/components/landing-page/dashboard/authentication/Authentication.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestFirebaseEmailLogin,
	requestFirebaseEmailRegister,
} from '@/redux/actions/Auth.action'
import React, { useState } from 'react'

function AuthenticationContainer() {
	const dispatch = useAppDispatch()

	const { loading, error } = useAppSelector(state => state.auth)

	const [selectedMode, setSelectedMode] = useState<'login' | 'signup'>('login')
	const [fullName, setFullName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleOnSelectedModeClick = (mode: 'login' | 'signup') => {
		setSelectedMode(mode)
	}

	const handleOnFullNameChange = (value: string) => {
		setFullName(value)
	}

	const handleOnEmailChange = (value: string) => {
		setEmail(value)
	}

	const handleOnPasswordChange = (value: string) => {
		setPassword(value)
	}

	const handleOnLoginWithEmailClick = (event: React.SubmitEvent) => {
		event.preventDefault()
		dispatch(requestFirebaseEmailLogin({ email, password }))
	}

	const handleOnSignUpWithEmailClick = (event: React.SubmitEvent) => {
		event.preventDefault()
		dispatch(requestFirebaseEmailRegister({ fullName, email, password }))
	}

	return (
		<Authentication
			selectedMode={selectedMode}
			fullName={fullName}
			email={email}
			password={password}
			error={error ?? ''}
			accountLoading={loading}
			onSelectedModeClick={handleOnSelectedModeClick}
			onFullNameChange={handleOnFullNameChange}
			onEmailChange={handleOnEmailChange}
			onPasswordChange={handleOnPasswordChange}
			onLoginWithEmailClick={handleOnLoginWithEmailClick}
			onSignUpWithEmailClick={handleOnSignUpWithEmailClick}
			onLoginWithGoogleClick={() => {}}
		/>
	)
}

export default AuthenticationContainer
