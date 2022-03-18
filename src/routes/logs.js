import React from 'react'
import {Container} from '@mui/material'

import {LogFiles} from '../components/logsComponent.js'

export default function Logs() {
  return (
    <Container style={{marginTop: "1em"}}>
      <LogFiles/>
    </Container>
  )
}
