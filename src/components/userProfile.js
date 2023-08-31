import React from 'react'
import { Grid, Button, Typography } from '@mui/material'
import authenticatedFetch from '../utils/apiFetcher'
import handleTokenExpiration from '../utils/handleTokenExpiration'

export default function UserProfile() {
    //const [userList, setUserList] = useState();


    const handleClick = async () => {
        const APIURL = '/api/v2/check-token'
        let res = await authenticatedFetch(APIURL)

        if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else if (res) {
            console.log(res)
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

    //const adminSection = () => {
    //    const APIURL = "/api/v2/admin/users"
    //}

    return (
        <Grid container spacing={2} sx={{width: '70%', margin: 'auto'}}>
            <Grid item xs={12}>
                <Typography variant='h4' gutterBottom>
                    Administration
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>
                    Change password
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button>Open Dialog</Button>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>
                    Access logs
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleClick}>Open Dialog</Button>
            </Grid>
        </Grid>
    )
}
