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

function App() {

  return (
    <>
        <AuthProvider>
            <BrowserRouter>
              <Header />
                 <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
        </AuthProvider>

    </>
  )
}

export default App
