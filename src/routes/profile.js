import React from 'react'
import { Grid, Button, Typography } from '@mui/material'

export default function Profile() {
    return (
        <Grid container spacing={2} sx={{width: '70%', margin: 'auto'}}>
            <Grid item xs={6}>
                <Typography variant="button" gutterBottom>
                    Change password
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button>xs=4</Button>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="button" gutterBottom>
                    Access logs
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button>xs=8</Button>
            </Grid>
        </Grid>
    )
}
