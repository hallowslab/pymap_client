import React from 'react'
import {Container} from '@mui/material'

import { LogDataComponent } from '../components/logDataComponent'

export default function LogFile() {
    return (
        <Container style={{maxWidth: "95vw", marginTop: "1em"}}>
            <LogDataComponent/>
        </Container>
    )
}