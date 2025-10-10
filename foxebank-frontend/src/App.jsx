import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import './App.css';

import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react"


function App() {
  return (
    <div className='App'>
      <LoginPage/>
      <SignupPage/>
      <Navbar/>
      <Footer/>
    </div>
  );
}

export default App;
