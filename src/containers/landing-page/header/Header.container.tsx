import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { headerNavLinks } from "./Header.helper";
import Header from "@/components/landing-page/header/Header.component";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCartDrawerOpen } from "@/redux/actions/Cart.action";

function HeaderContainer() {
    const dispatch = useAppDispatch();

    const { cartDataCount } = useAppSelector((state) => state.cart);

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOnMobileOpen = (value: boolean) => {
        setMobileOpen(value)
    }

    const handleOnOpenCartDrawerClick = () => {
        dispatch(setCartDrawerOpen(true))
    }

    return (
        <Header
            headerNavLinks={headerNavLinks}
            mobileOpen={mobileOpen}
            cartDataCount={cartDataCount}
            onMobileOpen={handleOnMobileOpen}
            onOpenCartDrawerClick={handleOnOpenCartDrawerClick}
        />
    )
}

export default HeaderContainer;