import type { Notification, NotificationState } from "../types/Notification.type";
import { NOTIFICATION_ACTIONS } from "../actions/Notification.actions";

const initialState: NotificationState = { notifications: [] }

type Action = { type: string; payload?: unknown }

export const notificationReducer = (state = initialState, action: Action): NotificationState => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_SYSTEM_NOTIFICATION:
      return {
        notifications: [...state.notifications, action.payload as Notification],
      }

    case NOTIFICATION_ACTIONS.REMOVE_SYSTEM_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          notification => notification.id !== (action.payload as { id: string }).id
        ),
      }
      
    default:
      return state
  }
}