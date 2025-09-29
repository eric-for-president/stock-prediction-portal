import { useState } from 'react'
import './assets/css/style.css'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login.jsx";
import AuthProvider from  './AuthProvider.jsx'
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";


function App() {

  return (
    <>
        <AuthProvider>
            <BrowserRouter>
              <Header />
                 <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                     <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                     <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute> } />
        </Routes>
        <Footer />
      </BrowserRouter>
        </AuthProvider>

    </>
  )
}

export default App
