import React from 'react'
import { Container, Grid } from '@mui/material'

import { OptionsList } from '../components/optionsList'

export default function Options() {
    return (
        <Container>
            <Grid container spacing={2} style={{ marginTop: '1em' }}>
                <Grid item xs={12}>
                    <OptionsList />
                </Grid>
            </Grid>
        </Container>
    )
}
