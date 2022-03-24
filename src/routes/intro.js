import { Button } from '@mui/material'
import React from 'react'

import { CurrentSession } from '../components/session'

export default function Intro() { 

  let handleChange = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    CurrentSession.setLatestTask(r)
  }

  return (
    <React.Fragment>
      <h1>Welcome to Pymap</h1>
      <div>
        Here lies a basic description that will briefly explain how to use the
        tool
      </div>
      <div>Insert sample text</div>
      <Button onClick={handleChange}>Set Latest Task</Button>
    </React.Fragment>
  )
}
