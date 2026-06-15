import { Field } from "@base-ui/react";

function AccountContainer({
    mode,
    onModeClick
}: {
    mode: string,
    onModeClick: () => void
}) {
    return (
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-md">
                <div className="text-center">
                    <p className="text-xs uppercase tracking-luxe text-primary">ANSYLA Circle</p>
                    <h1 className="mt-3 font-serif text-4xl">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                </div>

                <div className="mt-8 flex border border-border">
                    {(["login", "signup"] as const).map((m ) => (
                        <button
                            key={m}
                            onClick={() => onModeClick(m)}
                            className={`flex-1 py-3 text-xs uppercase tracking-luxe transition-colors ${mode === m ? "bg-gradient-gold text-primary-foreground" : "text-muted-foreground"
                                }`}
                        >
                            {m === "login" ? "Login" : "Sign Up"}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {mode === "signup" && (
                        <Field label="Full Name" value={name} onChange={setName} />
                    )}
                    <Field label="Email Address" type="email" value={email} onChange={setEmail} />
                    <Field label="Password" type="password" value={password} onChange={setPassword} />

                    {mode === "login" && (
                        <div className="text-right">
                            <button type="button" className="text-xs text-muted-foreground hover:text-primary">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {error && <p className="text-xs text-destructive">{error}</p>}

                    <button
                        disabled={busy}
                        className="w-full bg-gradient-gold py-3.5 text-xs font-medium uppercase tracking-luxe text-primary-foreground disabled:opacity-60"
                    >
                        {busy ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-3 border border-border py-3 text-sm hover:border-primary disabled:opacity-60"
                >
                    <span className="font-serif text-base text-primary">G</span> Continue with Google
                </button>

                <div className="mt-6 space-y-1 rounded-sm border border-primary/20 bg-card p-4 text-center text-xs text-muted-foreground">
                    <p>This is a preview — any email logs you into a demo account.</p>
                    <p>
                        Try <span className="text-primary">admin@ansyla.co.za</span> to enter the admin
                        dashboard.
                    </p>
                </div>
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
                        Join the ANSYLA Circle for early access to collections, complimentary engraving, and
                        exclusive member events across South Africa.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { icon: Package, label: "Track Orders" },
                        { icon: MapPin, label: "Saved Addresses" },
                        { icon: Heart, label: "Wishlist" },
                        { icon: User, label: "Profile" },
                    ].map((item) => (
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
    );
}

export default AccountContainer;