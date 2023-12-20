import React, { StrictMode } from 'react'
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
import Admin from './routes/admin'

import './i18n'
import { UserRolesProvider, UserRolesContext } from './utils/userRolesProvider';
import { UnauthorizedAccess } from './routes/unauthorized'
  
// NOTE: Due to the way the app is structured with the outlet, nested routes should be added alongside
// their parent routes with the full path, to avoid rendering other page contents, however,
// they can also be nested using nested Outlets as it's currently done
ReactDOM.render(
    <StrictMode>
    <BrowserRouter>
        <UserRolesProvider>
        <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Intro />} />
                    <Route path="sync" element={<Sync />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="tasks/:taskID" element={<Logs />} />
                    <Route path="tasks/:taskID/:logID" element={<LogFile />} />
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route
                        path="profile/admin"
                        element={
                        <UserRolesContext.Consumer>
                            {({ userRoles }) =>
                            userRoles.includes('admin') ? (
                                <Admin />
                            ) : (
                                <UnauthorizedAccess />
                            )
                            }
                        </UserRolesContext.Consumer>
                        }
                    />
                </Route>
        </Routes>
        </UserRolesProvider>
    </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
