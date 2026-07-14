import type { AddressState } from './Address.type'
import type { AuthState } from './Auth.type'
import type { CartState } from './Cart.type'
import type { CategoryState } from './Category.type'
import type { CouponState } from './Coupon.type'
import type { CustomerState } from './Customer.type'
import type { NewsletterState } from './Newsletter.type'
import type { NotificationState } from './Notification.type'
import type { OrderState } from './Order.type'
import type { ProductState } from './Product.type'
import type { ReviewState } from './Review.type'
import type { SettingsState } from './Settings.type'
import type { WishlistState } from './Wishlist.type'

export interface RootState {
	system: {
		notification: NotificationState
	}
	auth: AuthState
	newsletter: NewsletterState
	settings: SettingsState
	category: CategoryState
	product: ProductState
	cart: CartState
	coupon: CouponState
	order: OrderState
	customer: CustomerState
	wishlist: WishlistState
	review: ReviewState
	address: AddressState
}
