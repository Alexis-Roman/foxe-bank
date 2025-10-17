import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SendMoney from './components/SendMoney';
import Settings from './pages/SettingsPage';
import TransactionPage from './pages/TransactionPage';
import ReceiveMoneyPage from './pages/ReceiveMoneyPage';
import InboxPage from './pages/InboxPage';

import { Toaster, toaster } from "@/components/ui/toaster"

import History from './components/history';

import React from "react";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} /> {/* default */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sendmoney" element={<SendMoney />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/receiveMoney" element={<ReceiveMoneyPage />} />
        <Route path="/inbox" element={<InboxPage />} />
      </Routes>
    </Router>

      <Toaster />
    </>
    

  );
}

export default App;
