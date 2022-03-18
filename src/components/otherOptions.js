import React from 'react'
import {Box, List, ListItem, ListItemText, Divider, Switch, Input} from '@mui/material';


export function OptionsList(props) {
    const label = { inputProps: { 'aria-label': 'Option switches' } };

    return(
        <Box sx={{ width: '100%', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}>
            <Divider />
            <nav aria-label="service related options">
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={`--gmail${props.index}`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--office${props.index}`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--exchange${props.index}`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`--domino${props.index}`} />
                    <Switch {...label} />
                </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="other options">
                <List>
                <ListItem disablePadding>
                    <ListItemText primary={`NoSSL${props.index}`} />
                    <Switch {...label} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText primary={`NoTLS${props.index}`} />
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
        </Box>
    )
}