import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';


export default function OptionsList(props) {
    const label = { inputProps: { 'aria-label': 'Option switches' } };

    return(
        <Box sx={{ width: '100%', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}>
            <Divider />
            <nav aria-label="main mailbox folders">
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
            <nav aria-label="main mailbox folders">
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
                    <Switch {...label} />
                </ListItem>
                </List>
            </nav>
        </Box>
    )
}