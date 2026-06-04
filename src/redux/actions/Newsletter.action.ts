export const NEWSLETTER_ACTIONS = {
  REQUEST_SUBSCRIBE_TO_NEWSLETTER: '[NEWSLETTER] - SUBSCRIBE TO NEWSLETTER - REQUEST',
  REQUEST_SUBSCRIBE_TO_NEWSLETTER_LOADING: '[NEWSLETTER] - SUBSCRIBE TO NEWSLETTER - REQUEST - LOADING',
  SET_IS_SUBSCRIBED_TO_NEWSLETTER: '[NEWSLETTER] - IS SUBSCRIBED TO NEWSLETTER - SET'
} as const

export const requestSubscribeToNewsletter = (payload: string) => ({
  type: NEWSLETTER_ACTIONS.REQUEST_SUBSCRIBE_TO_NEWSLETTER,
  payload,
})

export const requestSubscribeToNewsletterLoading = (loading: boolean) => ({
  type: NEWSLETTER_ACTIONS.REQUEST_SUBSCRIBE_TO_NEWSLETTER_LOADING,
  payload: loading
})


export const setIsSubscribedToNewsletter = (payload: boolean) => ({
  type: NEWSLETTER_ACTIONS.SET_IS_SUBSCRIBED_TO_NEWSLETTER,
  payload
})