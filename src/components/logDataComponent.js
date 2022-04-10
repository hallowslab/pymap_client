import React, {useEffect, useState} from 'react'
import {Stack, } from '@mui/material'
import { useParams } from 'react-router-dom'

export function LogDataComponent() {
    let {taskID,logID} = useParams()
    const [logData, setLogData] = useState("")

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}/${logID}`
        const params = {
            headers: { 'accepts': 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.content) {
                    setLogData(res.content)
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
        }, 10000)
        return () => {clearInterval(dataTimer)}
     }, [])


    return(
        <React.Fragment>
            <Stack spacing={2}>
                <h2>Task ID: {taskID} Log file: {logID}</h2>
                <p>{logData}</p>
            </Stack>
        </React.Fragment>
    )
}