import type { CategoryState } from "./Category.type"
import type { NotificationState } from "./Notification.type"
import type { ProductState } from "./Product.type"
import type { SettingsState } from "./Settings.type"

export interface RootState {
  system: {
    notifications: NotificationState
  },
  settings: SettingsState,
  category: CategoryState,
  product: ProductState
}