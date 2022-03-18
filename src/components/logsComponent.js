import React, {useEffect, useState} from 'react'
import {Stack, Link} from '@mui/material'


export function LogFiles() {
    const [logs, setLogs] = useState([])


    const fetchLogs = () => {
        const APIURL = 'http://127.0.0.1:5000/api/v1/logs'
        const params = {
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.logs) {
                    setLindex(res.logs.length)
                    setLogs(res.logs)
                }
                else if (res.error) {console.error(`API Error: ${res.error} -> ${res.message}`)}
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect( () => { fetchLogs() }, [logs])



    return(
        <React.Fragment>
            <Stack spacing={2}>
                <h2>Log files</h2>
                { logs.map( (val, index) => <Link key={index} href="#">{val}</Link> )}
            </Stack>
        </React.Fragment>
    )
}