import React,{useContext} from 'react'
import Button from './Button'
import {Link,useNavigate} from 'react-router-dom'
import logo from '../assets/images/logo.png'
import {AuthContext} from '../AuthProvider'
const Header = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout =()=>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
        console.log("logged out")

        navigate('/login')
    }
    return (
        <>
            <nav className='navbar container pt-3 pb-3 align-items-start'>
                <Link to="/" className="navbar-brand d-flex align-items-center text-skyblue m-0">
                    <img
                        src={logo}
                        alt="Stock Prediction Portal Logo"
                        width="200"
                        height="100"
                        className="me-2"
                    />
                    {/*<span className="fw-bold"> Portal</span>*/}
                </Link>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Button text='Dashboard' class="btn-info" url="/dashboard" />
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

                        </>


                    ):(<>
                        <Button text='Login' class="btn-outline-info" url="/login" />

                        &nbsp;
                        <Button text='Register' url="/register" class="btn-info" />
                        </>
                        )}


                </div>
            </nav>
        </>
    )
}

export default Header
