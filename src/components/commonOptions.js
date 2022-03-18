import React from 'react'
import {Box, List, ListItem, ListItemText, Switch, Input} from '@mui/material'


export function CommonOptions() {
    const label = { inputProps: { 'aria-label': 'Option switches' } };
    return(
        <Box sx={{ width: '100%', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}>
            <nav aria-label="common options">
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={`--addheader`} />
                    <Switch {...label} defaultChecked />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--justlogin`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--justconnect`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--usecache`} />
                    <Switch {...label} defaultChecked />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--logdir`}/>
                    <Input defaultValue="/home/pymap/imap_logs"/>
                </ListItem>
                </List>
            </nav>
            
        </Box>
    )
}