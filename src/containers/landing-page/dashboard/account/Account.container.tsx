import Account from "@/components/landing-page/dashboard/account/Account.component";
import { useState } from "react";

function AccountContainer() {

    const [selectedMode, setSelectedMode] = useState<"login" | "signup">("login");
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [accountLoading, setaccountLoading] = useState<boolean>(false);

    const handleOnSelectedModeClick = (mode: "login" | "signup") => {
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

    const handleOnAccountSumbitClick = () => {

    }

    return (
        <Account
            selectedMode={selectedMode}
            fullName={fullName}
            email={email}
            password={password}
            error={error}
            accountLoading={accountLoading}
            onSelectedModeClick={handleOnSelectedModeClick}
            onAccountSumbitClick={handleOnAccountSumbitClick}
            onFullNameChange={handleOnFullNameChange}
            onEmailChange={handleOnEmailChange}
            onPasswordChange={handleOnPasswordChange}
            onLoginWithGoogleClick={() => {}}
        />
    )
}

export default AccountContainer;