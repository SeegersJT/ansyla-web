import Cart from "@/components/landing-page/cart/Cart.component";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addToCart, removeAllOfProduct, removeFromCart } from "@/redux/actions/Cart.action";
import { requestApplyCoupon } from "@/redux/actions/Coupon.action";
import type { ProductItem } from "@/redux/types/Product.type";
import { useState } from "react";

function CartContainer() {
    const dispatch = useAppDispatch();

    const { cartData, cartDataSubtotal } = useAppSelector((state) => state.cart);
    const { settingsData } = useAppSelector((state) => state.settings);
    const { couponItem, isCouponApplied } = useAppSelector((state) => state.coupon);

    const [coupon, setCoupon] = useState<string>('');

    const settings = settingsData[0];

    const shippingCost = cartDataSubtotal >= (settings?.free_shipping_threshold ?? Infinity)
        ? 0
        : (settings?.shipping_cost ?? 0);

    const discount = isCouponApplied && couponItem
        ? (cartDataSubtotal * couponItem.discount_percentage) / 100
        : 0;

    const total = cartDataSubtotal - discount + shippingCost;

    const handleOnRemoveAllOfProductClick = (productId: string) => {
        dispatch(removeAllOfProduct(productId));
    };

    const handleOnRemoveCartItemClick = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleOnAddCartItemClick = (product: ProductItem, quantity: number) => {
        dispatch(addToCart(product, quantity));
    };

    const handleApplyCoupon = () => {
        dispatch(requestApplyCoupon(coupon.trim()));
    };

    const handlOnCouponChange = (coupon: string) => {
        setCoupon(coupon)
    }

    return (
        <Cart
            cartData={cartData}
            settings={settingsData[0]}
            cartDataSubtotal={cartDataSubtotal}
            coupon={coupon}
            couponItem={couponItem}
            isCouponApplied={isCouponApplied}
            shippingCost={shippingCost}
            discount={discount}
            total={total}
            onRemoveAllOfProductClick={handleOnRemoveAllOfProductClick}
            onRemoveCartItemClick={handleOnRemoveCartItemClick}
            onAddCartItemClick={handleOnAddCartItemClick}
            onCouponChange={handlOnCouponChange}
            onApplyCouponClick={handleApplyCoupon}
        />
    );
}

export default CartContainer;