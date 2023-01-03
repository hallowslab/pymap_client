import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Menu, {NoMenu} from './components/menu'
import Footer from './components/footer'
import LoginForm from './components/loginComponent'

/* 
function refreshToken(token) {
    if (token == null) {
        return ""
    }
    console.debug(`Auth Token: ${token}`)
    console.debug("Refreshing token")
    fetch("/api/v2/refresh-token", {
        method: "POST",
        headers: { accepts: 'application/json', 'Authorization': `Bearer ${token}` }
    })
    .then((res) => {
        if (res.status != 200) {
            console.debug(res)
            alert("API Error, check logs")
            console.debug("Clearing token")
            localStorage.removeItem("token")
        }
        return res.json()
    })
    .then((data)=>{
        if (data.access_token) {
            localStorage.setItem("token", data.access_token)
            return data.access_token
        } else {
            console.log(`API Error ${data.error}: ${data.message}`)
            return ""
        }
    }).catch((err) => console.error(`Error: ${err}`))
} */

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"))

    if (token) {
        return (
            <div className="App">
                <header>
                    <Menu />
                </header>
                <Outlet />
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    } 
    return (
        <div className="App">
            <header>
                <NoMenu />
            </header>
            <LoginForm tokenFunc={setToken}/>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default App
