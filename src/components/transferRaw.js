import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    TextareaAutosize,
    Button,
    TextField,
    Grid,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Box
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

export function TransferRaw() {
    const APIURL = '/api/v1/sync'
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [redirecting, setRedirecting] = useState(false)
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [dryRun, setDryRun] = useState(false)
    const extraArgs = localStorage.getItem('extraArgs')

    const HelpTooltip = `
    Input the accounts and credentials as displayed in the placeholder, you can use the following separators: [ "blank space" | ,]
    `


    const handleChange = () => {
        // Split the lines
        if (source === '' || destination === '' || input.length <= 5) {
            alert(
                'Your input seems to be invalid, check the values in the browser console'
            )
            console.error(
                `Input : ${input}\nSource: ${source}\nDestination: ${destination}\nDry run: ${dryRun}\nExtra args: ${extraArgs}`
            )
            return
        }
        const DATA = JSON.stringify({
            destination: destination,
            source: source,
            input: input.split(/\r?\n/),
            dry_run: dryRun,
            extra_args: extraArgs,
        })
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
                setRedirecting(true)
                setTimeout(() => {
                    navigate('/tasks/' + res.taskID)
                }, 1000)
            })
            .catch((err) => {
                alert('An error has occurred, please check the console')
                console.error(`Error: ${err}`)
            })
    }

    // The difference is that the onInput event occurs immediately after the value of an element has changed,
    // while onChange occurs when the element loses focus,
    return (
        <Box style={{marginBottom: "5em"}}>
            {redirecting === true ? (
                <CircularProgress style={{ margin: '0.5em' }} />
            ) : (
                <span />
            )}
            <Grid style={{ marginTop: '1em', paddingBottom: "7em"}} container spacing={2}>
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
                <Grid item xs={12}>
                    <Tooltip title={HelpTooltip}>
                        <Button>Hover for Help</Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip
                    title={
                        <div style={{ whiteSpace: 'pre-line', width: "100%"}}>{"Input the data as follows: \n\n Account1@domain.tld password\n Account2@domain.tld password\n... \n or \n Source@domain.tld ... Destination@domain.tld ...\n\n Check options for additional parameters"}</div>
                    }
                    >
                        <Button>Current Regex</Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        minRows={5}
                        placeholder="Source@Account Password Destination@Account Password&#10;test@email.com Password123 test@email.com Password123"
                        style={{ width: '70%' }}
                        value={input}
                        onInput={(e) => setInput(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleChange}>Start Sync</Button>

                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        disabled
                        style={{ margin: '0 auto 0 1em' }}
                        control={
                            <Checkbox
                                onChange={() => {
                                    setDryRun(!dryRun)
                                }}
                            />
                        }
                        label="Dry run"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
