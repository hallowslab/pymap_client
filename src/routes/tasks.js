import React from 'react'
import { Container } from '@mui/material'

import { TasksComponent } from '../components/tasksComponent'
import { LOG_CONTAINER_STYLE } from '../styles'

export default function Tasks() {
    return (
        <Container style={LOG_CONTAINER_STYLE}>
            <TasksComponent />
        </Container>
    )
}
