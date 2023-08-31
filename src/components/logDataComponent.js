import React, { useEffect, useState } from 'react'
import { Stack, TextField, Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import authenticatedFetch from '../utils/apiFetcher'
import handleTokenExpiration from '../utils/handleTokenExpiration'

export function LogDataComponent() {
    let { taskID, logID } = useParams()
    const [logData, setLogData] = useState('')
    const [tailCount, setTailCount] = useState(100)
    const [tailTimeout, setTailTimeout] = useState(5)
    const timerValue = localStorage.getItem('timerValue')
    ? localStorage.getItem('timerValue')
    : 20000

    const fetchData = async () => {
        const APIURL = `/api/v2/tasks/${taskID}/${logID}?tcount=${tailCount}&ttimeout=${tailTimeout}`
        let res = await authenticatedFetch(APIURL)
        if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else if (res.content) {
            if (res.proc_error) {
                console.error(`Error: ${res.proc_error}`)
            }
            setLogData(res.content)
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

    const handleDownload = () =>{
        const DOWNLOADURL = `/api/v2/tasks/${taskID}/${logID}/download`
        const params = {
            headers: {
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
        }
        fetch(DOWNLOADURL, params)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = logID;  // File name
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
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
                    <Button onClick={handleDownload}>
                        {logID}
                    </Button>
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
