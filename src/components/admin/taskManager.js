import React, {useState, useEffect} from "react"
import { DataGrid } from '@mui/x-data-grid'
import authenticatedFetch from '../../utils/apiFetcher'
import { Button, Typography } from "@mui/material";

const columns = [
    { field: 'taskID', headerName: 'ID', width: 70 },
    { field: 'source', headerName: 'Source', width: 200 },
    { field: 'destination', headerName: 'Destination', width: 250 },
    {
        field: 'logPath',
        headerName: 'Log Path',
        width: 200,
    },
    {
        field: 'archived',
        headerName: 'Archived',
        type: 'boolean',
        width: 50,
    },
    {
        field: 'owner',
        headerName: 'Owner',
        width: 250,
    },
];

const TaskManager = ()=> {

    const aTimeout = 10000
    const [tasks, setTasks] = useState([])
    const [gridOpen, setGridOpen] = useState(true)
    const toggleGridDisplay = ()=> {setGridOpen(!gridOpen)}
    
    useEffect(() => {
        fetchTasks()
        const dataTimer = setInterval(() => {
            fetchTasks()
        }, aTimeout)
        return () => clearInterval(dataTimer)
    }, [])

    const fetchTasks = async () => {
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

    const handleOnCellClick = (e)=> {
        console.log(e)
    }

    return (
        <React.Fragment>
            <Typography variant="h5">Task Administration</Typography>
            <Button onClick={toggleGridDisplay}>Click to expand</Button>
            <DataGrid
                style={gridOpen? {display: 'flex'} : {display: 'none'}}
                rows={tasks}
                columns={columns}
                onCellClick={handleOnCellClick}
                checkboxSelection
                
            />
        </React.Fragment>
    )
}

export default TaskManager