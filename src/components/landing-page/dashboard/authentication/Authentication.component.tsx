import FieldLabel from '@/components/field-label/FieldLabel.component'
import { Award, Heart, MapPin, Package, User } from 'lucide-react'
import type React from 'react'

function Authentication({
	selectedMode,
	fullName,
	email,
	password,
	error,
	accountLoading,
	onSelectedModeClick,
	onFullNameChange,
	onEmailChange,
	onPasswordChange,
	onLoginWithEmailClick,
	onSignUpWithEmailClick,
	onLoginWithGoogleClick,
}: {
	selectedMode: 'login' | 'signup'
	fullName: string
	email: string
	password: string
	error: string
	accountLoading: boolean
	onSelectedModeClick: (mode: 'login' | 'signup') => void
	onFullNameChange: (value: string) => void
	onEmailChange: (value: string) => void
	onPasswordChange: (value: string) => void
	onLoginWithEmailClick: (event: React.SubmitEvent) => void
	onSignUpWithEmailClick: (event: React.SubmitEvent) => void
	onLoginWithGoogleClick: () => void
}) {
	return (
		<div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
			<div className="mx-auto w-full max-w-md">
				<div className="text-center">
					<p className="text-xs uppercase tracking-luxe text-primary">ANSYLA Circle</p>
					<h1 className="mt-3 font-serif text-4xl">
						{selectedMode === 'login' ? 'Welcome Back' : 'Create Account'}
					</h1>
				</div>

				<div className="mt-8 flex border border-border">
					{(['login', 'signup'] as const).map(mode => (
						<button
							key={mode}
							onClick={() => onSelectedModeClick(mode)}
							className={`flex-1 py-3 text-xs uppercase tracking-luxe transition-colors ${
								selectedMode === mode
									? 'bg-gradient-gold text-primary-foreground'
									: 'text-muted-foreground'
							}`}
						>
							{mode === 'login' ? 'Login' : 'Sign Up'}
						</button>
					))}
				</div>

				<form
					onSubmit={
						selectedMode === 'login' ? onLoginWithEmailClick : onSignUpWithEmailClick
					}
					className="mt-6 space-y-4"
				>
					{selectedMode === 'signup' && (
						<FieldLabel
							label="Full Name"
							value={fullName}
							onChange={onFullNameChange}
						/>
					)}

					<FieldLabel
						label="Email Address"
						type="email"
						value={email}
						onChange={onEmailChange}
					/>
					<FieldLabel
						label="Password"
						type="password"
						value={password}
						onChange={onPasswordChange}
					/>

					{selectedMode === 'login' && (
						<div className="text-right">
							<button
								type="button"
								className="text-xs text-muted-foreground hover:text-primary"
							>
								Forgot password?
							</button>
						</div>
					)}

					{error && <p className="text-xs text-destructive">{error}</p>}

					<button
						disabled={accountLoading}
						className="w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60"
					>
						{accountLoading
							? 'Please wait…'
							: selectedMode === 'login'
								? 'Login'
								: 'Create Account'}
					</button>
				</form>

				<div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
					<span className="h-px flex-1 bg-border" /> or{' '}
					<span className="h-px flex-1 bg-border" />
				</div>

				<button
					type="button"
					onClick={onLoginWithGoogleClick}
					disabled={accountLoading}
					className="flex w-full items-center justify-center gap-3 border border-border py-3 text-sm hover:border-primary disabled:opacity-60"
				>
					<span className="font-serif text-base text-primary">G</span> Continue with
					Google
				</button>
			</div>

			{/* Benefits preview */}
			<div className="space-y-6">
				<div className="border border-primary/30 bg-card p-6 shadow-gold">
					<div className="flex items-center gap-3">
						<Award className="h-7 w-7 text-primary" />
						<div>
							<p className="font-serif text-2xl">ANSYLA Rewards</p>
							<p className="text-xs uppercase tracking-wider text-primary">
								Earn points on every purchase
							</p>
						</div>
					</div>
					<p className="mt-4 text-sm text-muted-foreground">
						Join the ANSYLA Circle for early access to collections, complimentary
						engraving, and exclusive member events across South Africa.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{[
						{ icon: Package, label: 'Track Orders' },
						{ icon: MapPin, label: 'Saved Addresses' },
						{ icon: Heart, label: 'Wishlist' },
						{ icon: User, label: 'Profile' },
					].map(item => (
						<div
							key={item.label}
							className="flex flex-col items-center gap-3 border border-border bg-card p-6 text-center"
						>
							<item.icon className="h-6 w-6 text-primary" />
							<span className="text-sm">{item.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Authentication
