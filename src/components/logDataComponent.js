import React, { useEffect, useState } from 'react'
import { Stack, TextField, Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'

export function LogDataComponent() {
    let { taskID, logID } = useParams()
    const [logData, setLogData] = useState('')
    const [tailCount, setTailCount] = useState(100)
    const [tailTimeout, setTailTimeout] = useState(5)
    const timerValue = localStorage.getItem('timerValue')
        ? localStorage.getItem('timerValue')
        : 20000

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}/${logID}?tcount=${tailCount}&ttimeout=${tailTimeout}`
        const params = {
            headers: {
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
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
                } else if (res.content) {
                    setLogData(res.content)
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
            console.log(timerValue)
            fetchData()
        }, timerValue)
        return () => {
            clearInterval(dataTimer)
        }
    }, [timerValue])

    return (
        <React.Fragment>
            <Stack spacing={2}>
                <h2>Task ID: {taskID} </h2>
                <h3>
                    Log file:{' '}
                    <a href={`/api/v1/tasks/${taskID}/${logID}/download`}>
                        {logID}
                    </a>
                </h3>
                <Box
                    sx={{
                        width: '900',
                        height: '900',
                    }}
                >
                    <TextField
                        style={{ margin: '0 0.2em 0 0.2em' }}
                        id="tail-timeout"
                        label="Tail timeout"
                        helperText="Seconds before timeout is raised by tail"
                        defaultValue={tailTimeout}
                        onChange={(e) => {
                            setTailTimeout(e.target.value)
                        }}
                    />
                    <TextField
                        style={{ margin: '0 0.2em 0 0.2em' }}
                        id="tail-count"
                        label="Tail count"
                        helperText="Number of lines to tail from file"
                        defaultValue={tailCount}
                        onChange={(e) => {
                            setTailCount(e.target.value)
                        }}
                    />
                    <Button
                        onClick={() => {
                            fetchData()
                        }}
                        style={{ margin: '0.5em' }}
                    >
                        Update
                    </Button>
                    <TextField
                        id="log-content"
                        value={logData}
                        variant="filled"
                        multiline
                        minRows={4}
                        maxRows={20}
                        style={{ width: '90%', marginBottom: '1em' }}
                    />
                </Box>
            </Stack>
        </React.Fragment>
    )
}
