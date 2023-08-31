import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom'
import authenticatedFetch from '../utils/apiFetcher'
import handleTokenExpiration from '../utils/handleTokenExpiration'

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

    const fetchData = async () => {
        const APIURL = `/api/v2/tasks/${taskID}`
        let res = await authenticatedFetch(APIURL)
        if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else if (res.logs) {
            setRows(
                res.logs?.map((val, index) => {
                    return { id: index + 1, ...val }
                })
            )
            setTaskStatus(res.status.state)
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
            fetchData()
        }, timerValue)
        return () => {
            clearInterval(dataTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnCellClick = (params) => {
        navigate(params.row.logFile)
    }

    return (
        <React.Fragment>
            <div style={{ height: '80vh' }}>
                <h2 style={{ display: 'inline-block', marginRight: '2em' }}>
                    Task ID: {taskID}{' '}
                </h2>
                <h4 style={{ display: 'inline-block' }}>State: {taskStatus}</h4>
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
