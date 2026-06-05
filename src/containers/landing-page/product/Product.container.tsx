import Product from "@/components/landing-page/product/Product.component";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addToCart } from "@/redux/actions/Cart.action";
import { requestProductByProductNo } from "@/redux/actions/Product.action";
import type { ProductItem } from "@/redux/types/Product.type";
import { Utils } from "@/utils/Utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductContainer() {
    const dispatch = useAppDispatch();

    const {selectedProduct} = useAppSelector((state) => state.product)
    const {settingsData} = useAppSelector((state) => state.settings)

    const { context } = useParams<{ context: string }>();

    const [zoom, setZoom] = useState<boolean>(false);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
    const [addedToWishList, setAddedToWishList] = useState<boolean>(false)

    const stockAvailibility = Utils.calculateStockAvailability(selectedProduct?.stock);

    const handleOnZoomChange = (value: boolean) => {
        setZoom(value)
    }

    const handleOnQuantityChange = (value: number) => {
        setSelectedQuantity(value)
    }

    const handleOnAddToWishListClick = () => {
        setAddedToWishList(!addedToWishList)
    }

    const handleOnAddToCartClick = (product: ProductItem, selectedQuantity: number) => {
        dispatch(addToCart(product, selectedQuantity))
    }

    useEffect(() => {
        dispatch(requestProductByProductNo(context))
    }, [dispatch, context])

    return (
        <Product
            product={selectedProduct}
            zoom={zoom}
            settings={settingsData[0]}
            stockAvailibity={stockAvailibility}
            selectedQuantity={selectedQuantity}
            addedToWishList={addedToWishList}
            relatedProducts={[]}
            onZoomChange={handleOnZoomChange}
            onQuantityChange={handleOnQuantityChange}
            onAddToWishlistClick={handleOnAddToWishListClick}
            onAddToCartClick={handleOnAddToCartClick}
        />
    )
}

export default ProductContainer;