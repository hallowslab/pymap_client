import React, { useState } from 'react'
import {Button, Divider,Box, List, ListItem, ListItemText, Switch, Input} from '@mui/material'


export function OptionsList() {
    const [commonOptions,setCommonOptions] = useState({})

    console.log(commonOptions,setCommonOptions)

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
            <Divider />
            <nav aria-label="service related options">
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={`--gmail1`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--office1`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--exchange1`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--domino1`} />
                    <Switch {...label} />
                </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="other options">
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={`NoSSL1`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`NoTLS1  `} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`Other....`} />
                </ListItem>
                <ListItem>
                    <Input defaultValue="--arg1 --arg2"/>
                </ListItem>
                </List>
            </nav>
            <Button>Save</Button>
        </Box>
    )
}