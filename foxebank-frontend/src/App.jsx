import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Dashboard from './components/Dashboard';
// import SendMoney from './components/SendMoney';
// import History from './components/history';

import React from "react";

function App() {
  return (
    <div className='App'>
      {/* <LoginPage/> */}
      <SignupPage/>
      {/* <Navbar/>
      <Dashboard/>
      <Footer/>
      <SendMoney/>
      <History/> */}

    </div>
  );
}

export default App;
