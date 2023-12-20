import React from 'react'
//import { Grid, Button, Typography } from '@mui/material'
import { Container } from '@mui/material';
import UserList from '../components/admin/userList';
import TaskManager from '../components/admin/taskManager';

export default function Admin() {
    return (
        <Container>
            <div style={{ height: 350, width: '100%', marginBottom: 150 }}>
                <UserList/>
            </div>
            <div style={{ height: 350, width: '100%', marginBottom: 175 }}>
                <TaskManager/>
            </div>
        </Container>
    )
}
