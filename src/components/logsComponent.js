import React, {useEffect, useState} from 'react'
import {Stack, Link, } from '@mui/material'
import { useParams } from 'react-router-dom'

export function LogsComponent() {
    let {taskID} = useParams()
    const [logs, setLogs] = useState([])

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}`
        const params = {
            headers: { 'accepts': 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.logs) {
                    setLogs(res.logs)
                }
                else if (res.error) {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }



    useEffect( () => {
        fetchData()
        const dataTimer = setInterval(()=>{
            fetchData()
        }, 20000)
        return () => {clearInterval(dataTimer)}
     }, [])


    return(
        <React.Fragment>
            <Stack spacing={2}>
                <h2>Log files</h2>
                {logs?.map( (val, index) => <Link key={"log_"+index} href={`${taskID}/${val}`}>{val}</Link> )}
            </Stack>
        </React.Fragment>
    )
}