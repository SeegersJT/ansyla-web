import { useState } from "react";
import { headerNavLinks } from "./Header.helper";
import Header from "@/components/landing-page/header/Header.component";

function HeaderContainer() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOnMobileOpen = (value: boolean) => {
        setMobileOpen(value)
    }

    return (
        <Header
            headerNavLinks={headerNavLinks}
            mobileOpen={mobileOpen}
            onMobileOpen={handleOnMobileOpen}
        />
    )
}

export default HeaderContainer;