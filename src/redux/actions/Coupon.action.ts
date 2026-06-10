import type { CouponItem } from "../types/Coupon.type"

export const COUPON_ACTIONS = {
    REQUEST_APPLY_COUPON: '[COUPON] - APPLY COUPON - REQUEST',
    REQUEST_APPLY_COUPON_LOADING: '[COUPON] - APPLY COUPON - REQUEST - LOADING',
    SET_APPLY_COUPON: '[COUPON] - APPLY COUPON - SET'
} as const

export const requestApplyCoupon = (coupon_code: string) => ({
    type: COUPON_ACTIONS.REQUEST_APPLY_COUPON,
    payload: coupon_code
})

export const requestApplyCouponLoading = (loading: boolean) => ({
    type: COUPON_ACTIONS.REQUEST_APPLY_COUPON_LOADING,
    payload: loading
})

export const setApplyCoupon = (couponItem: CouponItem, isCouponApplied: boolean) => ({
    type: COUPON_ACTIONS.SET_APPLY_COUPON,
    payload: { couponItem, isCouponApplied }
})