import { call, put, takeLatest } from "redux-saga/effects"
import { NEWSLETTER_ACTIONS, requestSubscribeToNewsletterLoading, setIsSubscribedToNewsletter } from "../actions/Newsletter.action"
import { addSystemNotification } from "../actions/Notification.action"
import { firestoreService } from "@/firebase"

function* handleSubscribeToNewsletterRequest(action: { type: string; payload: string }) {
    yield put(requestSubscribeToNewsletterLoading(true))

    try {
        yield call(
            [firestoreService, firestoreService.add],
            'Newsletters',
            { email_address: action.payload }
        )

        yield put(setIsSubscribedToNewsletter(true))
        yield put(addSystemNotification({ type: 'success', title: "Newsletter", message: 'Successfully Subscribed to the Newsletter' }))
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to Retrieve Category Data'
        yield put(addSystemNotification({ type: 'error', title: "Categories", message: message }))
    } finally {
        yield put(requestSubscribeToNewsletterLoading(false))
    }

}

export function* newsletterSaga() {
    yield takeLatest(NEWSLETTER_ACTIONS.REQUEST_SUBSCRIBE_TO_NEWSLETTER, handleSubscribeToNewsletterRequest)
}
