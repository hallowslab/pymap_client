import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import OptionsList from "../components/otherOptions"
import CommonOptions from '../components/commonOptions'

export default function Options() {
  return (
    <Container>
      <Grid container spacing={2} style={{marginTop: "1em"}}>
        <Grid item xs={12}>
          <CommonOptions />
        </Grid>
        <Grid item xs={6}>
          <OptionsList index="1"/>
        </Grid>
        <Grid item xs={6}>
          <OptionsList index="2"/>
        </Grid>
      </Grid>
  </Container>
  )
}
