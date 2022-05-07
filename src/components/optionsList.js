import React, { useEffect, useState } from 'react'
import {Button, Box, TextareaAutosize, LinearProgress} from '@mui/material'

function getStoredInput () {
    let extraArgs = localStorage.getItem("extraArgs")
    if (extraArgs.length == 0) {
        return ""
    }
    return extraArgs
}


function OptionsList() {
    const [uInput, setUInput] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(()=>{
        setUInput(getStoredInput())
    }, [])

    const saveToLocalStorage = () => {
        setSaving(true)
        try {
            localStorage.setItem("extraArgs")
        } catch(e) {
            alert("Unexpected error occured")
        }

    }

    return(
        <React.Fragment>
            {saving === true ? <LinearProgress style={{margin: '0.5em'}}/> : <span/>}
            <Box sx={{ maxWidth: "95vw", margin: "auto", bgcolor: 'background.paper' }}>
                <h2>Work in Progress....</h2>
                <p>
                    You can specify additional arguments here, do not add newlines or line carriages (Tab/Enter) just one big string
                    <p>EX:{" "}<code>--nossl1 --notls1 --gmail2 --folder &quot;INBOX&quot;</code></p>
                </p>
                <p>If you need to encase a variable please use double quotes &quot; ... &quot; and not single &apos; ... &apos;</p>
                <TextareaAutosize
                            aria-label="empty textarea"
                            minRows={5}
                            placeholder={"--arg1 --arg2"}
                            style={{ width: '100%' }}
                            value={uInput}
                            onInput={(e) => setUInput(e.target.value)}
                        />
            </Box>
            <Button onClick={saveToLocalStorage}>Save</Button>
        </React.Fragment>
    )
}


export {getStoredInput, OptionsList}

/* export function OptionsList() {
    const [commonOptions,setCommonOptions] = useState({})

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
} */