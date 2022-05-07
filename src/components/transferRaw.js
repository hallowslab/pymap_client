import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {TextareaAutosize, Button, TextField, Grid, Checkbox, FormControlLabel, CircularProgress} from '@mui/material'

export function TransferRaw() {
    const APIURL = '/api/v1/sync'
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [redirecting, setRedirecting] = useState(false)
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [dryRun, setDryRun] = useState(false)

    const handleChange = () => {
        // Split the lines
        if (source === '' || destination === '' || input.length <= 5) {
            alert('Your input seems to be invalid, check the values in the browser console')
            console.error(
                `Input : ${input}\nSource: ${source}\nDestination: ${destination}`
            )
            return
        }
        const DATA = JSON.stringify({"destination": destination,"source": source,"input": input.split(/\r?\n/),"dry_run": dryRun})
        // make API POST
        const params = {
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            body: DATA,
            method: 'POST',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.log(res)
                // TODO: add a div or something to indicate loading
                setRedirecting(true)
                setTimeout( () => {
                    navigate("/tasks/" + res.taskID)
                }, 1000)
            })
            .catch((err) => {
                alert("An error has occurred, please check the console")
                console.error(`Error: ${err}`)
            })
    }

    // The difference is that the onInput event occurs immediately after the value of an element has changed,
    // while onChange occurs when the element loses focus,
    return (
        <React.Fragment>
            {redirecting === true ? <CircularProgress style={{margin: '0.5em'}}/> : <span/>}
            <Grid style={{ marginTop: '1em' }} container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Source"
                        variant="outlined"
                        onChange={(e) => setSource(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Destination"
                        variant="outlined"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Grid>
                <Grid style={{ marginTop: '0.5em' }} item xs={12}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        minRows={5}
                        placeholder="test@email.com Password123"
                        style={{ width: '70%' }}
                        value={input}
                        onInput={(e) => setInput(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button onClick={handleChange}>Start Sync</Button>
            <FormControlLabel style={{margin: "0 auto 0 1em"}} control={<Checkbox onChange={()=> {setDryRun(!dryRun)}}/>} label="Dry run" />
        </React.Fragment>
    )
}
