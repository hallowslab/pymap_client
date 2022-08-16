import React from 'react'
import { Container } from '@mui/material'

import { TasksComponent } from '../components/tasksComponent'

export default function Tasks() {
    return (
        <Container style={{ maxWidth: '95vw', marginTop: '1em' }}>
            <TasksComponent />
        </Container>
    )
}
