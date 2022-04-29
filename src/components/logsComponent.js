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
        width: 100
    }
  ];
  

export function LogsComponent() {
    let {taskID} = useParams()
    const navigate = useNavigate()
    const [rows, setRows] = useState([{id: 0, logFile: "fetching....."}])

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
                    setRows(res.logs?.map( (val, index) => {return {id: index+1, logFile: val}} ))
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