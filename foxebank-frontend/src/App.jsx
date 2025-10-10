import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
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
        <Route path="/" element={<Navigate to="/signup" />} /> {/* default redirect */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
