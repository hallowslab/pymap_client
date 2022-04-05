import React from 'react'
import {Container} from '@mui/material'

import {TasksComponent} from '../components/tasksComponent'

export default function Tasks() {
  return (
    <Container style={{marginTop: "1em"}}>
      <TasksComponent/>
    </Container>
  )
}
