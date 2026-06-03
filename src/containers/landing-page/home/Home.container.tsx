import { useAppSelector } from "@/hooks/useAppSelector";
import Home from "@/components/landing-page/home/Home.component";
import { reasons } from "./Home.helper";

function HomeContainer() {
    const { category_data } = useAppSelector((state) => state.category)
    const { product_data } = useAppSelector((state) => state.product)
    const { settings_data } = useAppSelector((state) => state.settings)

    const bestSellers = product_data.filter((product) => product.is_best_seller)

    return (
        <Home
            category_data={category_data}
            reasons={reasons}
            bestSellers={bestSellers}
            settings={settings_data[0]}
        />
    )
}

export default HomeContainer;