import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate, useParams } from 'react-router-dom'

// TODO: read this https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'logFile',
      headerName: 'Log File',
      width: 750,
    },
    {
        field: "startTime",
        headerName: "Start Time",
        width: 200,
    },
    {
        field: "endTime",
        headerName: "End Time",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 300
    }
  ];
  

export function LogsComponent() {
    let {taskID} = useParams()
    const navigate = useNavigate()
    const [rows, setRows] = useState([{id: 0, logFile: "fetching....."}])
    const timerValue = localStorage.getItem("timerValue") ? localStorage.getItem("timerValue") : 20000

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}`
        const params = {
            headers: { 'accepts': 'application/json' },
            method: 'GET',
        }
        console.log("Fetching API")
        console.log("Timer Value")
        console.log(timerValue)
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.log("Res is ")
                console.log(res)
                if (res.logs) {
                    console.log("Logs")
                    console.log(res.logs)
                    console.log("Log Status")
                    console.log(res.logsStatus)
                    setRows(res.logs?.map( (val, index) => {return {id: index+1, ...val}} ))
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
            console.log(timerValue)
            fetchData()
        }, timerValue)
        return () => {clearInterval(dataTimer)}
    }, [])
    
    const handleOnCellClick = (params) => {
        console.log(params.row.logFile)
        navigate(params.row.logFile)
    }



    return(
        <React.Fragment>
            <div style={{height: "80vh"}}>
                <h2>Task ID: {taskID} </h2>
                
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