import React, { useEffect, useState } from 'react'
import { Button, Box, TextareaAutosize, TextField } from '@mui/material'

function getStoredArgs() {
    let extraArgs = localStorage.getItem('extraArgs')
    if (extraArgs) {
        return extraArgs
    }
    return ''
}

function getStoredTimer() {
    let timerValue = localStorage.getItem('timerValue')
    if (timerValue) {
        return timerValue
    }
    return 20000
}

function OptionsList() {
    const [uInput, setUInput] = useState('')
    const [timerValue, setTimerValue] = useState(getStoredTimer)

    useEffect(() => {
        setUInput(getStoredArgs())
        setTimerValue(getStoredTimer())
    }, [])

    const saveToLocalStorage = () => {
        try {
            localStorage.setItem('extraArgs', uInput)
            localStorage.setItem('timerValue', timerValue)
        } catch (e) {
            alert('Unexpected error occured')
        }
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    maxWidth: '95vw',
                    margin: 'auto',
                    bgcolor: 'background.paper',
                }}
            >
                <h2>Work in Progress....</h2>
                <div>
                    You can specify additional arguments here, do not add
                    newlines or line carriages (Tab/Enter) just one big string
                    <div>
                        EX:{' '}
                        <code>
                            --nossl1 --notls1 --gmail2 --folder
                            &quot;INBOX&quot;
                        </code>
                    </div>
                </div>
                <p>
                    If you need to encase a variable/parameter please use double
                    quotes &quot; ... &quot; and not single &apos; ... &apos;
                </p>
                <p>
                    Please refer to{' '}
                    <a
                        href="https://imapsync.lamiral.info/#doc"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Imapsync FAQ/Doc
                    </a>
                </p>
                <TextareaAutosize
                    aria-label="textarea for extra arguments"
                    minRows={5}
                    placeholder={'--arg1 --arg2'}
                    style={{ width: '100%' }}
                    value={uInput}
                    onInput={(e) => setUInput(e.target.value)}
                />
                <h2>Other options</h2>
                <TextField
                    id="logs-refresh-timer"
                    label="Refresh Timer"
                    helperText="Time between API requests in MS"
                    defaultValue={timerValue}
                    onChange={(e) => {
                        setTimerValue(e.target.value)
                    }}
                />
            </Box>
            <Button onClick={saveToLocalStorage}>Save</Button>
        </React.Fragment>
    )
}

export { getStoredArgs, getStoredTimer, OptionsList }
