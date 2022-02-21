import React, { useState } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

export default function TransferRaw() {
    const APIURL = 'http://127.0.0.1:5000/api/v1'
    const [input, setInput] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')

    const handleChange = () => {
        // Split the lines
        if (source === '' || destination === '' || input.length <= 5) {
            alert('Your input seems to be invalid, check the values in the browser console')
            console.log(
                `Input : ${input}\nSource: ${source}\nDestination: ${destination}`
            )
            return
        }
        const DATA = {
            destination: destination,
            source: source,
            input: input.split(/\r?\n/),
        }
        // make API POST
        const params = {
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            body: DATA,
            method: 'POST',
        }
        console.log(DATA)
        fetch(APIURL, params)
            .then((data) => {
                console.log(`Data: ${data.json()}`)
            })
            .then((res) => {
                console.log(`Response: ${res}`)
            })
            .catch((err) => console.log(`Error: ${err}`))
    }
    // The difference is that the onInput event occurs immediately after the value of an element has changed,
    // while onChange occurs when the element loses focus,
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
