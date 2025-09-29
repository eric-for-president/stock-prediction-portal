import {useContext}from 'react'
import {AuthContext} from "./AuthProvider.jsx";

import {Navigate} from 'react-router-dom'
import React from 'react'

const PublicRoute = ({children}) => {
    const {isLoggedIn}=useContext(AuthContext)
    return !isLoggedIn ? (
        children
    ): (<Navigate to='/dashboard'/>)


}
export default PublicRoute

