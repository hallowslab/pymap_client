import jwt_decode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Menu, { NoMenu } from './components/menu'
import Footer from './components/footer'
import LoginForm from './components/loginComponent'
import authenticatedFetch from './utils/apiFetcher'
import handleTokenExpiration from './utils/handleTokenExpiration'
import { useUserRoles } from './utils/userRolesProvider'

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const hbTimeout = 60000
    const { setUserRoles } = useUserRoles();// Access userRoles from context

    const heartbeat = async () => {
        const APIURL = '/api/v2/heartbeat'
        const res = await authenticatedFetch(APIURL)
        if (res.error == 'InvalidTokenHeader') {
            console.debug('No token in header')
            return
        } else if (res.error == 'ExpiredAccessError' || res.error == 'BlacklistedError') {
            console.debug('Removing expired token')
            handleTokenExpiration()
        } else if (res.message) {
            console.debug(`Received message: ${res.message}`)
        } else {
            console.error(`API Error: ${res.error} -> ${res.message}`)
        }
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

    useEffect(() => {
        if (token) {
          const decoded = jwt_decode(token);
          setUserRoles(decoded.rls);
        }
      }, [token]);

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
