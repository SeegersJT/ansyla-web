import { useAppSelector } from "@/hooks/useAppSelector";
import Home from "@/components/landing-page/home/Home.component";
import { reasons, testimonials } from "./Home.helper";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { requestSubscribeToNewsletter } from "@/redux/actions/Newsletter.action";

function HomeContainer() {
    const dispatch = useAppDispatch();

    const { categoryData } = useAppSelector((state) => state.category)
    const { productData } = useAppSelector((state) => state.product)
    const { settingsData } = useAppSelector((state) => state.settings)
    const newsletter = useAppSelector((state) => state.newsletter)

    const bestSellers = productData.filter((product) => product.is_best_seller)
    const newArrivals = productData.filter((product) => product.is_new)

    const [newsletterEmailAddress, setNewsletterEmailAddress] = useState('');

    const hanldeOnSubscribeToNewsletter = (event: React.SubmitEvent) => {
        event.preventDefault();

        dispatch(requestSubscribeToNewsletter(newsletterEmailAddress))
    }

    const handleOnNewsletterEmailChange = (value: string) => {
        setNewsletterEmailAddress(value)
    }

    return (
        <Home
            categoryData={categoryData}
            reasons={reasons}
            bestSellers={bestSellers}
            newArrivals={newArrivals}
            settings={settingsData[0]}
            testimonials={testimonials}
            newsletterEmailAddress={newsletterEmailAddress}
            newsletter={newsletter}
            onSubscribeToNewsletter={hanldeOnSubscribeToNewsletter}
            onNewsletterEmailChange={handleOnNewsletterEmailChange}
        />
    )
}

export default HomeContainer;