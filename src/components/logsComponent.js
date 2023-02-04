import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
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
        const APIURL = `/api/v2/tasks/${taskID}`
        const params = {
            headers: {
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
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
                if (res.error == 'ExpiredAccessError') {
                    alert('Access expired, removing token...')
                    console.error('Access expired, removing token...')
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload()
                } else if (res.logs) {
                    console.debug('Log Status')
                    console.debug(res.logsStatus)
                    setRows(
                        res.logs?.map((val, index) => {
                            return { id: index + 1, ...val }
                        })
                    )
                    setTaskStatus(res.status.state)
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
            fetchData()
        }, timerValue)
        return () => {
            clearInterval(dataTimer)
        }
    }, [])

    const handleOnCellClick = (params) => {
        navigate(params.row.logFile)
    }

    const handleDelete = () => {
        const APIURL = `/api/v2/admin/delete-task?id=${taskID}`
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
            }).then((res) => {
                if (res.message) {
                    alert("Removed task")
                    navigate("/tasks")
                    window.location.reload()
                } else {
                    console.log(`API Error: ${res.error} -> ${res.message}`)
                }
            }).catch((err) => console.log(`Error: ${err}`))
    }

    return (
        <React.Fragment>
            <div style={{ height: '80vh' }}>
                <h2 style={{ display: 'inline-block', marginRight: '2em' }}>
                    Task ID: {taskID}{' '}
                </h2>
                <h2 style={{ display: 'inline-block' }}>State: {taskStatus}</h2>
                <DeleteIcon onClick={handleDelete}/>

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
