import { Outlet } from "react-router";
import FooterContainer from "@/containers/landing-page/footer/Footer.container";
import HeaderContainer from "@/containers/landing-page/header/Header.container";

function LandingPage() {
    return (
        <>
            <HeaderContainer />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <FooterContainer />
        </>
    )
}

export default LandingPage;