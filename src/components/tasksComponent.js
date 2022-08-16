import React, { useEffect, useState } from 'react'
//import {Stack, Link} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'taskID',
        headerName: 'Task ID',
        width: 450,
    },
    {
        field: 'source',
        headerName: 'Source',
        width: 200,
    },
    {
        field: 'dest',
        headerName: 'Destination',
        width: 200,
    },
    {
        field: 'domain',
        headerName: 'Domain',
        width: 300,
    },
]

export function TasksComponent() {
    const [tasks, setTasks] = useState([{ id: 0, taskID: 'fetching.....' }])
    const navigate = useNavigate()
    const timerValue = localStorage.getItem('timerValue')
        ? localStorage.getItem('timerValue')
        : 20000

    const fetchData = () => {
        const APIURL = '/api/v1/tasks'
        const params = {
            headers: { accepts: 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.log(res)
                // When the server fails to parse status the client doesn't display any info
                if (res.tasks) {
                    let new_tasks = res.tasks
                    new_tasks = new_tasks.filter((task) => {
                        if (!task.error) {
                            return task
                        }
                    })
                    setTasks(
                        new_tasks.map((val, index) => {
                            return {
                                id: index + 1,
                                ...val,
                            }
                        })
                    )
                    //setTasks(res.tasks)
                } else if (res.error) {
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
        return () => clearInterval(dataTimer)
    }, [])

    const handleOnCellClick = (params) => {
        console.log(params)
        console.log(params.row.taskID)
        navigate(params.row.taskID)
    }

    //<Stack spacing={2}>
    //    { tasks?.map( (val, index) => <Link key={"task_"+index} href={`tasks/${val}`}>{val}</Link> )}
    //</Stack>
    return (
        <React.Fragment>
            <div style={{ height: '80vh' }}>
                <h2>Latest tasks</h2>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[50]}
                    disableSelectionOnClick
                    onCellClick={handleOnCellClick}
                />
            </div>
        </React.Fragment>
    )
}
