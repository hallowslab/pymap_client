import React from 'react'
import { Container } from '@mui/material'

import { LogDataComponent } from '../components/logDataComponent'
import { LOG_CONTAINER_STYLE } from '../styles'

export default function LogFile() {
    return (
        <Container style={LOG_CONTAINER_STYLE}>
            <LogDataComponent />
        </Container>
    )
}
