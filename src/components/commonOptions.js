import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'


export default function CommonOptions() {
    const label = { inputProps: { 'aria-label': 'Option switches' } };
    return(
        <Box sx={{ width: '100%', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
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