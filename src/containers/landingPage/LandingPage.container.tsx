import { Outlet } from "react-router";
import HeaderContainer from "./header/Header.container";
import FooterContainer from "./footer/Footer.container";

function LandingPageContainer() {
    return (
        <>
            <HeaderContainer />
            <Outlet />
            <FooterContainer />
        </>
    )
}

export default LandingPageContainer;