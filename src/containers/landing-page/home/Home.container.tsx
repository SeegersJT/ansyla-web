import { useAppSelector } from "@/hooks/useAppSelector";
import Home from "@/components/landing-page/home/Home.component";
import { reasons, testimonials } from "./Home.helper";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { requestSubscribeToNewsletter } from "@/redux/actions/Newsletter.action";

function HomeContainer() {
    const dispatch = useAppDispatch();

    const { category_data } = useAppSelector((state) => state.category)
    const { product_data } = useAppSelector((state) => state.product)
    const { settings_data } = useAppSelector((state) => state.settings)
    const newsletter = useAppSelector((state) => state.newsletter)

    const bestSellers = product_data.filter((product) => product.is_best_seller)
    const newArrivals = product_data.filter((product) => product.is_new)

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
            category_data={category_data}
            reasons={reasons}
            bestSellers={bestSellers}
            newArrivals={newArrivals}
            settings={settings_data[0]}
            testimonials={testimonials}
            newsletterEmailAddress={newsletterEmailAddress}
            newsletter={newsletter}
            onSubscribeToNewsletter={hanldeOnSubscribeToNewsletter}
            onNewsletterEmailChange={handleOnNewsletterEmailChange}
        />
    )
}

export default HomeContainer;