import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardContainer from '../containers/dashboard/Dashboard.container'
import LandingPageContainer from '@/containers/landingPage/LandingPage.container'
import HomeContainer from '@/containers/landingPage/home/Home.container'
import ComingSoonContainer from '@/containers/coming-soon/ComingSoon.container'

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
      <Route path={'/'} element={<Navigate to={'/coming-soon'} replace />} />

      <Route path={'/coming-soon'} element={<ComingSoonContainer />} />

      {/* <Route element={<LandingPageContainer />}>
        <Route path={'/home'} element={<HomeContainer />} />
        <Route path={'/shop'} element={<DashboardContainer />} />

        <Route path={'/dashboard'} element={<DashboardContainer />} />
      </Route> */}

      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  </BrowserRouter>
)
