import React from 'react'
import { Grid, TextField } from '@mui/material'


export function ManualSyncComponent() {
    return (
        <Grid container spacing={2} style={{marginTop: "1em"}}>
            <Grid item xs={3}>
                <TextField label="Source"/>
                <TextField label="Destination"/>
            </Grid>
            <Grid item xs={5}>
                <TextField label="User 1"/>
                <TextField label="User 2"/>
            </Grid>
            <Grid item xs={3}>
                <TextField type="password" label="Password 1"/>
                <TextField type="password" label="Password 2"/>
            </Grid>
        </Grid>
    )
}