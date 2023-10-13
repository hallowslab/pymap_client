import React, {useContext, useState} from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { UserRolesContext } from '../utils/userRolesProvider';
import { useNavigate } from 'react-router-dom';
//import authenticatedFetch from '../utils/apiFetcher'
//import handleTokenExpiration from '../utils/handleTokenExpiration'


export default function UserProfile() {
    const [openDashboard, setOpenDashboard] = useState(false)
    const { userRoles } = useContext(UserRolesContext);
    const navigate = useNavigate();

    
    const handleRedirect = () => {
        setOpenDashboard(!openDashboard)
        if (openDashboard) {
            navigate("admin")
        } else {
            navigate("/profile")
        }
    }

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
                <Button onClick={()=>{console.log('User roles:', userRoles)}}>Open Dialog</Button>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>
                    Access logs
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button >Open Dialog</Button>
            </Grid>
            <Grid item xs={12}>
                {userRoles && userRoles.includes('admin') ? (
                    <Button onClick={handleRedirect}>Admin dashboard</Button>
                ) : (
                    <span />
                )}
            </Grid>
                    
        </Grid>
    )
}
