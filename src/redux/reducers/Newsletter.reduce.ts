import { NEWSLETTER_ACTIONS } from "../actions/Newsletter.action";
import type { NewsletterState } from "../types/Newsletter.type";

const initialState: NewsletterState = {
  isSubscribed: false,
  loading: false,
}

type Action = { type: string; payload?: unknown }

export const NewsLetterReducer = (state = initialState, action: Action): NewsletterState => {
  switch (action.type) {
    case NEWSLETTER_ACTIONS.SET_IS_SUBSCRIBED_TO_NEWSLETTER:
      return {
        ...state,
        isSubscribed: action.payload as boolean,
      }

    case NEWSLETTER_ACTIONS.REQUEST_SUBSCRIBE_TO_NEWSLETTER_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }

    default:
      return state
  }
}
