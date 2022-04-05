import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Sync from './routes/sync'
import Options from './routes/options'
import Tasks from './routes/tasks'
import Logs from './routes/logs'
import Intro from './routes/intro'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Intro />} />
        <Route path="sync" element={<Sync />} />
        <Route path="options" element={<Options />} />
        <Route path="tasks" element={<Tasks />}/>
        <Route path="tasks/:taskID" element={<Logs/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
