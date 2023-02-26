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
    Box,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

export function TransferRaw() {
    const APIURL = '/api/v2/sync'
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [redirecting, setRedirecting] = useState(false)
    const [source, setSource] = useState('')
    const [extraArgs, setExtraArgs] = useState('')
    const [destination, setDestination] = useState('')
    const [dryRun, setDryRun] = useState(false)

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
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: DATA,
            method: 'POST',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.error == 'ExpiredAccessError') {
                    alert('Access expired, removing token...')
                    console.error('Access expired, removing token...')
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload()
                } else if (res.taskID) {
                    console.log(res)
                    setRedirecting(true)
                    setTimeout(() => {
                        navigate('/tasks/' + res.taskID)
                    }, 1000)
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => {
                alert('An error has occurred, please check the console')
                console.error(`Error: ${err}`)
            })
    }

    // The difference is that the onInput event occurs immediately after the value of an element has changed,
    // while onChange occurs when the element loses focus,
    return (
        <Box style={{ paddingBottom: '5em' }}>
            {redirecting === true ? (
                <CircularProgress style={{ margin: '0.5em' }} />
            ) : (
                <span />
            )}
            <Grid
                style={{ marginTop: '1em', paddingBottom: '1em' }}
                container
                spacing={2}
            >
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
                            <div
                                style={{
                                    whiteSpace: 'pre-line',
                                    width: '100%',
                                }}
                            >
                                {
                                    'Input the data as follows: \n\n Account1@domain.tld password\n Account2@domain.tld password\n... \n or \n Source@domain.tld ... Destination@domain.tld ...\n\n Check options for additional parameters'
                                }
                            </div>
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
            </Grid>
            <div
                style={{
                    margin: 'auto',
                    width: '50vw',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button onClick={handleChange}>Start Sync</Button>
                <TextField
                    label="Additional Arguments"
                    placeholder="--nossl1 --timeout 120 ...."
                    variant="outlined"
                    onChange={(e) => setExtraArgs(e.target.value)}
                />
                <FormControlLabel
                    disabled
                    control={
                        <Checkbox
                            onChange={() => {
                                setDryRun(!dryRun)
                            }}
                        />
                    }
                    label="Dry run"
                />
            </div>
        </Box>
    )
}
