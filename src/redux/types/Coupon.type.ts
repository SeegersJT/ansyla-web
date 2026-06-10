export interface CouponItem {
    id: string,
    coupon_no: string,
    coupon_code: string,
    discount_percentage: number
}

export const defaultCouponItem: CouponItem = {
    id: '',
    coupon_no: '',
    coupon_code: '',
    discount_percentage: 0,
}

export interface CouponState {
    couponItem: CouponItem,
    isCouponApplied: boolean,
    couponLoading: boolean,
}
