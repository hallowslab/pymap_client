import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { useNavigate, useParams } from 'react-router-dom'

const columns = [
    {
        field: 'logFile',
        headerName: 'Log File',
        width: 750,
    },
    {
        field: 'startTime',
        headerName: 'Start Time',
        width: 200,
    },
    {
        field: 'endTime',
        headerName: 'End Time',
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 300,
    },
]

export function LogsComponent() {
    let { taskID } = useParams()
    const navigate = useNavigate()
    const [rows, setRows] = useState([{ id: 0, logFile: 'fetching.....' }])
    const [taskStatus, setTaskStatus] = useState('Querying Status')
    const timerValue = localStorage.getItem('timerValue')
        ? localStorage.getItem('timerValue')
        : 20000

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}`
        const params = {
            headers: { accepts: 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            method: 'GET',
        }
        console.debug('Fetching API')
        console.debug('Timer Value')
        console.debug(timerValue)
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.debug('Res is ')
                console.debug(res)
                if (res.logs) {
                    console.debug('Log Status')
                    console.debug(res.logsStatus)
                    setRows(
                        res.logs?.map((val, index) => {
                            return { id: index + 1, ...val }
                        })
                    )
                    setTaskStatus(res.status.state)
                } else if (res.error == "ExpiredAccessError") {
                    alert("Access expired, removing token...")
                    console.error("Access expired, removing token...")
                    localStorage.removeItem("token")
                    navigate("/")
                    window.location.reload()
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
            console.debug("Timer Value",timerValue)
            fetchData()
        }, timerValue)
        return () => {
            clearInterval(dataTimer)
        }
    }, [])

    const handleOnCellClick = (params) => {
        navigate(params.row.logFile)
    }

    return (
        <React.Fragment>
            <div style={{ height: '80vh' }}>
                <h2 style={{ display: 'inline-block' , marginRight: '2em'}}>Task ID: {taskID} </h2>
                <h2 style={{ display: 'inline-block' }}>State: {taskStatus}</h2>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[8]}
                    disableSelectionOnClick
                    onCellClick={handleOnCellClick}
                />
            </div>
        </React.Fragment>
    )
}
