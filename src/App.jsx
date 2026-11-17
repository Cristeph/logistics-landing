import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { AuthProvider } from '@/context/AuthContext';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { RequireAdmin, RequireAuth, DashboardHome } from '@/components/layout/guards';
import { LoadingBlock } from '@/components/ui';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/pages/HomePage';

// Everything except the landing page is code-split so first load stays small.
const TrackingPage = lazy(() => import('@/pages/TrackingPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const DashboardLayout = lazy(() => import('@/components/layout/DashboardLayout'));
const Overview = lazy(() => import('@/pages/dashboard/Overview'));
const Bookings = lazy(() => import('@/pages/dashboard/Bookings'));
const Notifications = lazy(() => import('@/pages/dashboard/Notifications'));
const Payments = lazy(() => import('@/pages/dashboard/Payments'));
const Account = lazy(() => import('@/pages/dashboard/Account'));
const Support = lazy(() => import('@/pages/dashboard/Support'));
const AdminOverview = lazy(() => import('@/pages/admin/AdminOverview'));
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'));
const AdminPayments = lazy(() => import('@/pages/admin/AdminPayments'));
const AdminCouriers = lazy(() => import('@/pages/admin/AdminCouriers'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));

// Keep-alive ping: wakes the free-tier API so the first real request isn't slow.
function useWakeApi() {
  useEffect(() => {
    fetch('/api/startup', { cache: 'no-store' }).catch(() => {});
  }, []);
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useWakeApi();
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <FeedbackProvider>
          <AuthProvider>
            <ScrollToTop />
            <Suspense fallback={<LoadingBlock className="min-h-dvh" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/track" element={<TrackingPage />} />
                <Route path="/track/:trackingID" element={<TrackingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <DashboardLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="booking" element={<Bookings />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="payment" element={<Payments />} />
                  <Route path="payment/invoice" element={<Navigate to="/dashboard/payment" replace />} />
                  <Route path="accountmanagement" element={<Account />} />
                  <Route path="support" element={<Support />} />

                  <Route element={<RequireAdmin />}>
                    <Route path="admin" element={<AdminOverview />} />
                    <Route path="ordermanagement" element={<AdminOrders />} />
                    <Route path="paymentmanagement" element={<AdminPayments />} />
                    <Route path="couriermanagement" element={<AdminCouriers />} />
                    <Route path="usersmanagement" element={<AdminUsers />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </FeedbackProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
