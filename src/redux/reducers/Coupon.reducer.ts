import { COUPON_ACTIONS } from '../actions/Coupon.action'
import { defaultCouponItem, type CouponItem, type CouponState } from '../types/Coupon.type'

const initialState: CouponState = {
	couponItem: defaultCouponItem,
	isCouponApplied: false,
	couponLoading: false,
}

type Action = { type: string; payload?: unknown }

export const CouponReducer = (state = initialState, action: Action): CouponState => {
	switch (action.type) {
		case COUPON_ACTIONS.REQUEST_APPLY_COUPON_LOADING:
			return {
				...state,
				couponLoading: action.payload as boolean,
			}

		case COUPON_ACTIONS.SET_APPLY_COUPON:
			return {
				...state,
				...(action.payload as { couponItem: CouponItem; isCouponApplied: boolean }),
			}

		default:
			return state
	}
}
