import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleRegistration = async (e) => {
        e.preventDefault()
        setLoading(true)
        const userData = {
            username, email, password
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log('Response.data==>', response.data)
            console.log('Registration successful')
            setErrors({})
            setSuccess(true)

        } catch (error) {
            setErrors(error.response.data)
            console.error("Registration error", error.response?.data || error.message);
        } finally {
            setLoading(false)
        }


    }
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 bg-light-dark p-5 rounded'>
                        <h3 className="text-light text-center mb-4">Create an account</h3>
                        <form onSubmit={handleRegistration}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">username</label>
                                <input id="username" type='text' name='username' placeholder='Enter your username' className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                                <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">email</label>
                                <input id="email" type="email" name='email' placeholder='Enter your email' className="form-control" value={email} onChange={e => setEmail(e.target.value)} />

                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">password</label>
                                <input id="password" type="password" name='password' placeholder='Enter your password' className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>

                            </div>
                            {success && <div className="alert alert-success">Registration succesful!</div>}
                            {loading ? (<button type="submit" className="btn btn-info d-block mx-auto" disabled><FontAwesomeIcon icon={faSpinner} spin />Please Wait...</button>
                            ) : (<button type="submit" className="btn btn-info d-block mx-auto">Register</button>
                            )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
