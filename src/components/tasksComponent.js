import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import CheckboxWrapper from './checkboxWrapper'
import authenticatedFetch from '../utils/apiFetcher'
import handleTokenExpiration from '../utils/handleTokenExpiration'
import { Button } from '@mui/material'

import { handleArchive,handleCancel,handleDelete } from '../utils/taskManagement'

const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
        field: 'source',
        headerName: 'Source',
        width: 200,
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 200,
    },
    {
        field: 'n_accounts',
        headerName: 'Nº Accounts',
        width: 100,
    },
    {
        field: 'owner_username',
        headerName: 'Owner',
        width: 100,
    },
]

export function TasksComponent() {
    const [tasks, setTasks] = useState([{ id: 0, taskID: 'fetching.....' }])
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [selectionModel, setSelectionModel] = useState([])
    const timerValue = localStorage.getItem('timerValue')
        ? localStorage.getItem('timerValue')
        : 20000

    const fetchData = async () => {
        const APIURL = '/api/v2/tasks'
        let res = await authenticatedFetch(APIURL)
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
        } else if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

    useEffect(() => {
        fetchData()
        const dataTimer = setInterval(() => {
            fetchData()
        }, timerValue)
        return () => clearInterval(dataTimer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnCellClick = (event, row) => {
        if (row.target.type == 'checkbox') {
            if (row.target.checked) {
                setSelectedRows([...new Set([...selectedRows, event.id])])
            } else {
                setSelectedRows([
                    ...new Set(selectedRows.filter((x) => x !== event.id)),
                ])
            }
        } else {
            window.open(`${window.location.href}/${event.id}`)
        }
    }


    const handleSelectionModelChange = (newSelection) => {
        console.debug('Selected changes', newSelection)
        setSelectionModel(newSelection)
        setSelectedRows(newSelection)
    }

    //<Stack spacing={2}>
    //    { tasks?.map( (val, index) => <Link key={"task_"+index} href={`tasks/${val}`}>{val}</Link> )}
    //</Stack>
    return (
        <React.Fragment>
            <div style={{ height: '80vh' }}>
                <h2>Latest tasks</h2>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 50,
                        paddingBottom: 20,
                    }}
                >
                    <Button color="success" onClick={async()=>{await handleArchive(selectedRows)}}>
                        Archive
                    </Button>
                    <Button color="warning" onClick={async()=>{await handleCancel(selectedRows)}}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={async()=>{await handleDelete(selectedRows)}}>
                        Delete
                    </Button>
                </div>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    disableSelectionOnClick
                    onCellClick={handleOnCellClick}
                    checkboxSelection
                    components={{
                        BaseCheckbox: CheckboxWrapper,
                    }}
                    onSelectionModelChange={handleSelectionModelChange}
                    selectionModel={selectionModel}
                />
            </div>
        </React.Fragment>
    )
}
