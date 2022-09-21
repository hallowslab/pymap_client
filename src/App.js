import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/menu'
import Footer from './components/footer'

function App() {
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

export default App
