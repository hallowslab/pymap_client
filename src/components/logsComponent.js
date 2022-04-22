import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { useParams } from 'react-router-dom'


// TODO: read this https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'logFile',
      headerName: 'Log File',
      width: 150,
      editable: false,
    }
  ];
  

export function LogsComponent() {
    let {taskID} = useParams()
    const [logs, setLogs] = useState([])
    const [rows, setRows] = useState([{id: 0, logFile: "fetching.txt"}])

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
                    setLogs(res.logs)
                }
                else if (res.error) {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }



    useEffect( () => {
        fetchData()
        setRows(logs?.map( (val, index) => {return {id: index, logFile: val}} ))
        const dataTimer = setInterval(()=>{
            setRows(logs?.map( (val, index) => {return {id: index, logFile: val}} ))
            fetchData()
        }, 20000)
        return () => {clearInterval(dataTimer)}
    }, [])
    
    const handleOnCellClick = (params) => {S
        console.log(params)
    }


    return(
        <React.Fragment>
            <div style={{height: 500}}>
                <h2>Log files</h2>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onCellClick={handleOnCellClick}
                />
                {
                //logs?.map( (val, index) => <Link key={"log_"+index} href={`${taskID}/${val}`}>{val}</Link> )
                }
            </div>
        </React.Fragment>
    )
}