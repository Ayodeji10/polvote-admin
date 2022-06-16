import React, { useState, useContext } from 'react'
import { DataContext } from "../dataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../components/apiRoot";

function Login() {
    // context 
    const { context, setContext } = useContext(DataContext)

    // history 
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const login = () => {
        setError(null)
        setLoading(true)
        axios.post(`${API.API_ROOT}/admin/signin`, { username: email, password })
            .then(response => {
                console.log(response)
                setLoading(false);
                setContext({ ...context, user: response.data })
                if (response.data.role === "pollofficer") {
                    localStorage.setItem('pollofficer_token', response.data.token)
                    navigate('/liveresults')
                } else {
                    localStorage.setItem('admin_token', response.data.token)
                    navigate('/overview')
                }
            }).catch(error => {
                console.log(error)
                setLoading(false)
                setError("Invalid email or password")
                setPassword('')
            })
    }

    return (
        <div className='container login'>
            <img src="/images/Logo.png" alt="Logo" className='mt-5' />
            <div className="row justify-content-between">
                <div className="col-lg-5">
                    <div className="login-form">
                        <h2>Admin Login</h2>
                        <p>Votes made on Polvote are only limited to Polvote and does not count for the National Election!</p>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id='email' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Password">Password</label>
                        <input type="password" id='Password' placeholder='***************' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="remember d-flex align-items-center mb-4">
                            <input type="checkbox" id='remember' /><label htmlFor="remember">Remember Me</label>
                        </div>
                        <p>{error}</p>
                        <button onClick={login}>{loading ? "loading..." : "Login"}</button>
                    </div>
                </div>
                <div className="col-lg-5 login-text d-flex flex-column align-items-end">
                    <img src="/images/secured.png" alt="secured" />
                    <h1>Explore Politics, Learn and Share Insights Online</h1>
                    <p>Polvote provides you with the ability to see profiles of Political Aspirants contesting or leadership, governance and economic positions near your locality with news feed for the internet and voting ability for these aspiring leaders in various category contests.</p>
                </div>
            </div>
        </div>
    )
}

export default Login