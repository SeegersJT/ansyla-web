import { call, put, takeLatest } from "redux-saga/effects"
import { COUPON_ACTIONS, requestApplyCouponLoading, setApplyCoupon } from "../actions/Coupon.action";
import type { CouponItem } from "../types/Coupon.type";
import { firestoreService } from "@/firebase";
import { addSystemNotification } from "../actions/Notification.action";

function* handleApplyCouponRequest(action: { type: string; payload: string }) {
  yield put(requestApplyCouponLoading(true))

  try {
    const results: CouponItem[] = yield call(
      [firestoreService, firestoreService.getAll],
      'Coupons',
      [firestoreService.where('coupon_code', '==', action.payload)]
    )

    if (results.length === 0) {
      yield put(addSystemNotification({ type: 'error', title: "Coupon", message: "Coupon code not found" }))
      yield put(setApplyCoupon({} as CouponItem, false))
      return
    }

    yield put(setApplyCoupon(results[0], true))
    yield put(addSystemNotification({ type: 'success', title: "Coupon", message: `Coupon ${results[0].coupon_code} applied successfully` }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to Apply Coupon'
    yield put(addSystemNotification({ type: 'error', title: "Coupon", message: message }))
  } finally {
    yield put(requestApplyCouponLoading(false))
  }
}

export function* couponSaga() {
  yield takeLatest(COUPON_ACTIONS.REQUEST_APPLY_COUPON, handleApplyCouponRequest)
}