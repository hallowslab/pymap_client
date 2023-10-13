import React from 'react'
//import { Grid, Button, Typography } from '@mui/material'
import { Container } from '@mui/material';
import UserList from '../components/admin/userList';

export default function Admin() {
    return (
        <Container style={{height: "250px"}}>
            <UserList/>
        </Container>
    )
}
