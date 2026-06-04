import Shop from "@/components/landing-page/shop/Shop.component";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { CategoryItem } from "@/redux/types/Category.type";
import { useMemo, useState } from "react";
import type { OrderByItem } from "./Shop.helper";

function ShopContainer() {
    const { settings_data } = useAppSelector((state) => state.settings);
    const { category_data } = useAppSelector((state) => state.category);
    const { product_data } = useAppSelector((state) => state.product);

    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000)
    const [selectedOrderBy, setSelectedOrderBy] = useState<OrderByItem>("featured")

    const handleOnSelectedCategoryChange = (category: CategoryItem | null) => {
        setSelectedCategory(category)
    }

    const handlOnSelectedMaxPriceChange = (value: number) => {
        setSelectedMaxPrice(value)
    }

    const handleOnSelectedOrderByChange = (orderBy: OrderByItem) => {
        setSelectedOrderBy(orderBy)
    }

    const filteredProducts = useMemo(() => {
        let result = [...product_data]

        if (selectedCategory) {
            result = result.filter((p) => p.category_id === selectedCategory.id)
        }

        if (selectedMaxPrice) {
            result = result.filter((p) => p.price <= selectedMaxPrice)
        }

        switch (selectedOrderBy) {
            case "newest":
                result.sort((a, b) => Number(!!b?.is_new) - Number(!!a?.is_new));
                break;
            case "price-asc":
                result.sort((a, b) => a?.price - b?.price);
                break;
            case "price-desc":
                result.sort((a, b) => b?.price - a?.price);
                break;
            case "popular":
                result.sort((a, b) => Number(!!b?.is_best_seller) - Number(!!a?.is_best_seller));
                break;
        }

        return result
    }, [product_data, selectedCategory, selectedMaxPrice, selectedOrderBy])

    return (
        <Shop
            category_data={category_data}
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            selectedMaxPrice={selectedMaxPrice}
            selectedOrderBy={selectedOrderBy}
            settings={settings_data[0]}
            onSelectedCategoryChange={handleOnSelectedCategoryChange}
            onSelectedMaxPriceChange={handlOnSelectedMaxPriceChange}
            onSelectedOrderByChange={handleOnSelectedOrderByChange}
        />
    );
}

export default ShopContainer;