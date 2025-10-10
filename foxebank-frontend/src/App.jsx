import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LandingPage from './components/Landing';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import SendMoney from './components/SendMoney';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Dashboard from './components/Dashboard';
// import SendMoney from './components/SendMoney';
// import History from './components/history';

import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} /> {/* default redirect */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sendmoney" element={<SendMoney />} />
      </Routes>
    </Router>

    // <div className='App'>
    //   {/* <LoginPage/> */}
    //   <SignupPage/>
    //   {/* <Navbar/>
    //   <Dashboard/>
    //   <Footer/>
    //   <SendMoney/>
    //   <History/> */}

    // </div>
  );
}

export default App;
