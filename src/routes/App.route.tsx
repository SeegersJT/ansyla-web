import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPageContainer from '@/containers/landing-page/LandingPage.container'
import HomeContainer from '@/containers/landing-page/home/Home.container'
import DashboardContainer from '@/containers/landing-page/dashboard/Dashboard.container'
// import ComingSoonContainer from '@/containers/coming-soon/ComingSoon.container'
import ShopContainer from '@/containers/landing-page/shop/Shop.container'
import ProductContainer from '@/containers/landing-page/product/Product.container'
import CartDrawer from '@/components/cart-drawer/CartDrawer.component'
import CartContainer from '@/containers/landing-page/cart/Cart.container'
import ScrollToTop from '@/components/scroll-to-top/ScrollToTop.component'
import AuthenticationContainer from '@/containers/landing-page/dashboard/authentication/Authentication.container'
import AccountContainer from '@/containers/landing-page/dashboard/account/Account.container'
import ProtectedRoute from '@/components/protected-route/ProtectRoute.component'
import AdminProtectRoute from '@/components/admin-protect-route/AdminProtectRoute.component'
import OverviewContainer from '@/containers/landing-page/dashboard/account/overview/Overview.container'
import OrdersContainer from '@/containers/landing-page/dashboard/account/orders/Orders.container'
import WishlistContainer from '@/containers/landing-page/dashboard/account/wishlist/Wishlist.container'
import AddressesContainer from '@/containers/landing-page/dashboard/account/addresses/Addresses.container'
import ProfileContainer from '@/containers/landing-page/dashboard/account/profile/Profile.container'
import AdminContainer from '@/containers/landing-page/dashboard/admin/Admin.container'
import AdminOverviewContainer from '@/containers/landing-page/dashboard/admin/overview/Overview.container'
import AdminStockContainer from '@/containers/landing-page/dashboard/admin/stock/Stock.container'
import AdminOrdersContainer from '@/containers/landing-page/dashboard/admin/orders/Orders.container'
import AdminCustomersContainer from '@/containers/landing-page/dashboard/admin/customers/Customers.container'
import { NavigateInjector } from '@/components/navigate-injector/NavigateInjector.component'
import AdminCategoriesContainer from '@/containers/landing-page/dashboard/admin/categories/Categories.containers'
import AdminSettingsContainer from '@/containers/landing-page/dashboard/admin/settings/Settings.container'
import CheckoutContainer from '@/containers/landing-page/checkout/Checkout.container'

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={'/'} element={<Navigate to={'/home'} replace />} />

			{/* <Route path={'/coming-soon'} element={<ComingSoonContainer />} /> */}

			<Route element={<LandingPageContainer />}>
				<Route path={'/home'} element={<HomeContainer />} />
				<Route path={'/shop'} element={<ShopContainer />} />
				<Route path={'/product/:context'} element={<ProductContainer />} />
				<Route path={'/cart'} element={<CartContainer />} />
				<Route path={'/checkout'} element={<CheckoutContainer />} />

				<Route path="/dashboard" element={<DashboardContainer />}>
					<Route index element={<AuthenticationContainer />} />

					<Route element={<ProtectedRoute />}>
						<Route path={'account'} element={<AccountContainer />}>
							<Route index element={<Navigate to="overview" replace />} />
							<Route path="overview" element={<OverviewContainer />} />
							<Route path="orders" element={<OrdersContainer />} />
							<Route path="wishlist" element={<WishlistContainer />} />
							<Route path="addresses" element={<AddressesContainer />} />
							<Route path="profile" element={<ProfileContainer />} />
						</Route>

						<Route element={<AdminProtectRoute />}>
							<Route path={'admin'} element={<AdminContainer />}>
								<Route index element={<Navigate to="overview" replace />} />
								<Route path="overview" element={<AdminOverviewContainer />} />
								<Route path="stock" element={<AdminStockContainer />} />
								<Route path="categories" element={<AdminCategoriesContainer />} />
								<Route path="orders" element={<AdminOrdersContainer />} />
								<Route path="customers" element={<AdminCustomersContainer />} />
								<Route path="settings" element={<AdminSettingsContainer />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Route>

			<Route path="*" element={<Navigate to={'/'} replace />} />
		</Routes>

		<CartDrawer />
		<ScrollToTop />
		<NavigateInjector />
	</BrowserRouter>
)
