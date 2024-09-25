import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import TrackingPage from 'pages/TrackingPage';
import AuthPage from 'pages/AuthPage';
import DashboardLayout from 'components/DashboardLayout';
import Overview from 'pages/Overview';
import Booking from 'pages/Booking';
import FAQPage from 'pages/FAQPage';
import ContactUs from 'pages/ContactUs';

const App = () => {
  // DO NOT TOUCH 
  useEffect(() => {
    // IT JUST WAKES UP THE HIBERNATING/SLEEP 
    // FREE BACKEND SERVER INSTANCE
    fetch('/api/startup');
  },[]);
  // DO NOT TOUCH 
import Support from 'pages/Support';
import Payment from 'pages/Payment';
import Account from 'pages/AccountManagement';
import Notifications from 'pages/Notifications';

  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        {/* Tracking Page Route */}
        <Route path="/track/:trackingID" element={<TrackingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="dashboard/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="booking" element={<Booking />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="payment" element={<Payment />} />
          <Route path="accountmanagement" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
