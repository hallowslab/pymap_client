import React from 'react'
import { Container } from '@mui/material'

import { LogsComponent } from '../components/logsComponent'

export default function Logs() {
    return (
        <Container
            style={{
                maxWidth: '95vw',
                marginTop: '1em',
                paddingBottom: '10em',
            }}
        >
            <LogsComponent />
        </Container>
    )
}
