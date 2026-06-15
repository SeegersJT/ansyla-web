import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPageContainer from '@/containers/landing-page/LandingPage.container'
import HomeContainer from '@/containers/landing-page/home/Home.container'
import DashboardContainer from '@/containers/landing-page/dashboard/Dashboard.container'
import ComingSoonContainer from '@/containers/coming-soon/ComingSoon.container'
import ShopContainer from '@/containers/landing-page/shop/Shop.container'
import ProductContainer from '@/containers/landing-page/product/Product.container'
import CartDrawer from '@/components/cart-drawer/CartDrawer.component'
import CartContainer from '@/containers/landing-page/cart/Cart.container'
import ScrollToTop from '@/components/scroll-to-top/ScrollToTop.component'
import AccountContainer from '@/containers/landing-page/dashboard/account/Account.container'

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user, initialized } = useAppSelector(state => state.auth)

//   if (!initialized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
//       </div>
//     )
//   }

//   return user ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />
// }

// const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
// //   const user = useAppSelector(state => state.auth.user)
// //   return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : <>{children}</>
//     return <>{children}</>
// }

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Navigate to={'/home'} replace />} />

      <Route path={'/coming-soon'} element={<ComingSoonContainer />} />

      <Route element={<LandingPageContainer />}>
        <Route path={'/home'} element={<HomeContainer />} />
        <Route path={'/shop'} element={<ShopContainer />} />
        <Route path={'/product/:context'} element={<ProductContainer />} />
        <Route path={'/cart'} element={<CartContainer />} />

        <Route path={'/dashboard'} element={<DashboardContainer />}>
          <Route path={'account'} element={<AccountContainer />} />
          {/* <Route path={'/customer'} element={<LoginContainer />} />
          <Route path={'/admin'} element={<LoginContainer />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>

    <CartDrawer />
    <ScrollToTop />
    
  </BrowserRouter>
)
