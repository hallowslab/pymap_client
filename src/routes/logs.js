import React from 'react'
import { Container } from '@mui/material'

import { LogsComponent } from '../components/logsComponent'
import { LOG_CONTAINER_STYLE } from '../styles'

export default function Logs() {
    return (
        <Container style={LOG_CONTAINER_STYLE}>
            <LogsComponent />
        </Container>
    )
}
