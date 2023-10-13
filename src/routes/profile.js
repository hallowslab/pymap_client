import React from 'react'

import UserProfile from '../components/userProfile'
import { Outlet } from 'react-router-dom'

export default function ProfilePage() {
    return (
        <React.Fragment>
            <UserProfile/>
            <Outlet/>
        </React.Fragment>
    )
}
