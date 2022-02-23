import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/menu'

function App() {
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <Outlet />
    </div>
  )
}

export default App
