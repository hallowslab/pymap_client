import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// ROUTES
import Sync from './routes/sync'
import Tasks from './routes/tasks'
import Logs from './routes/logs'
import LogFile from './routes/logFile'
import Intro from './routes/intro'
import ProfilePage from './routes/profile'

import './i18n'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Intro />} />
                <Route path="sync" element={<Sync />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="tasks/:taskID" element={<Logs />} />
                <Route path="tasks/:taskID/:logID" element={<LogFile />} />
                <Route path="profile" element={<ProfilePage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
