import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import CheckboxWrapper from './checkboxWrapper'
import authenticatedFetch from '../utils/apiFetcher'
import handleTokenExpiration from '../utils/handleTokenExpiration'
import { Button } from '@mui/material'

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
        field: 'domain',
        headerName: 'Domain',
        width: 250,
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
        const params = {
            headers: {
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
        }
        let res = await authenticatedFetch(APIURL, params)
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
            console.error(`API Error: ${res.error} -> ${res.message}`)
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

    const handleDelete = async () => {
        if (selectedRows.length <= 0) {
            alert('You need to select a task')
        } else {
            const confirmed = window.confirm("Are you sure you want to delete the task(s)?")
            if (confirmed) {
                const APIURL = '/api/v2/admin/delete-tasks'
                const DATA = JSON.stringify({ task_ids: selectedRows })
                const params = {
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: DATA,
                    method: 'POST',
                }
                console.debug("Requesting delete of task IDs:", selectedRows)
                let res = await authenticatedFetch(APIURL, params)
                alert(JSON.stringify(res.message, null, 2))
                }
            }
        }

    const handleArchive = async () => {
        if (selectedRows.length <= 0) {
            alert('You need to select a task')
        } else {
            const confirmed = window.confirm("Are you sure you want to archive the task(s)?")
            if (confirmed) {
                const APIURL = '/api/v2/admin/archive-tasks'
                const DATA = JSON.stringify({ task_ids: selectedRows })
                const params = {
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: DATA,
                    method: 'POST',
                }
                let res = await authenticatedFetch(APIURL, params)
                alert(JSON.stringify(res.message, null, 2))
            }
        }
    }

    const handleCancel = async () => {
        if (selectedRows.length <= 0) {
            alert('You need to select a task')
        } else {
            const confirmed = window.confirm("Are you sure you want to cancel the task(s)")
            if (confirmed) {
                const APIURL = 'api/v2/admin/cancel-tasks'
                const DATA = JSON.stringify({task_ids: selectedRows})
                const params = {
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: DATA,
                    method: 'POST',
                }
                let res = authenticatedFetch(APIURL, params)
                alert(JSON.stringify(res.message, null, 2))
            }
        }
    }

    const handleSelectionModelChange = (newSelection) => {
        console.debug("Selected changes", newSelection)
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
                    <Button color="success" onClick={handleArchive}>
                        Archive
                    </Button>
                    <Button color="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={handleDelete}>
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
