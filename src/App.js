import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Menu, { NoMenu } from './components/menu'
import Footer from './components/footer'
import LoginForm from './components/loginComponent'

function App() {
    const APIURL = '/api/v2/heartbeat'
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()
    const hbTimeout = 60000

    const heartbeat = () => {
        const params = {
            headers: {
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.error == 'InvalidTokenHeader') {
                    return
                } else if (res.error == 'ExpiredAccessError') {
                    alert('Access expired, removing token...')
                    console.error('Access expired, removing token...')
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload()
                } else if (res.message) {
                    console.debug(`Received message: ${res.message}`)
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect(() => {
        heartbeat()
        const dataTimer = setInterval(() => {
            if (token) {
                heartbeat()
            }
        }, hbTimeout)
        return () => clearInterval(dataTimer)
    }, [])

    if (token) {
        return (
            <div className="App">
                <header>
                    <Menu />
                </header>
                <Outlet />
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
    return (
        <div className="App">
            <header>
                <NoMenu />
            </header>
            <LoginForm tokenFunc={setToken} />
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default App
