import LandingPage from "@/components/landing-page/LandingPage.component";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { requestCategoryItems } from "@/redux/actions/Category.action";
import { requestProductItems } from "@/redux/actions/Product.action";
import { requestSettings } from "@/redux/actions/Settings.action";
import { useEffect } from "react";

function LandingPageContainer() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(requestCategoryItems())
        dispatch(requestProductItems())
        dispatch(requestSettings())
    }, [])

    return (
        <LandingPage />
    )
}

export default LandingPageContainer;