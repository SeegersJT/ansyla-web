import { useState } from "react";
import { headerNavLinks } from "./Header.helper";
import Header from "@/components/landing-page/header/Header.component";
import { useAppSelector } from "@/hooks/useAppSelector";

function HeaderContainer() {
    const { cartData } = useAppSelector((state) => state.cart);

    const [mobileOpen, setMobileOpen] = useState(false);

    const cartDataCount = cartData.reduce((total, item) => total + item.quantity, 0)

    const handleOnMobileOpen = (value: boolean) => {
        setMobileOpen(value)
    }

    return (
        <Header
            headerNavLinks={headerNavLinks}
            mobileOpen={mobileOpen}
            cartDataCount={cartDataCount}
            onMobileOpen={handleOnMobileOpen}
        />
    )
}

export default HeaderContainer;