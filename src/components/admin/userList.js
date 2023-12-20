import React, {useEffect, useState} from "react"
import { DataGrid } from '@mui/x-data-grid'
import authenticatedFetch from '../../utils/apiFetcher'
import { Button, Typography } from "@mui/material";
import CheckboxWrapper from "../checkboxWrapper";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email Address', width: 250 },
    {
        field: 'lastLogin',
        headerName: 'Last login',
        width: 200,
    },
    {
        field: 'active',
        headerName: 'Is active',
        type: 'boolean',
        width: 50,
    }
];

const UserList = ()=> {

    const aTimeout = 10000
    const [users, setUsers] = useState([])
    const [gridOpen, setGridOpen] = useState(true)
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [selectionModel, setSelectionModel] = useState([])
    const toggleGridDisplay = ()=> {setGridOpen(!gridOpen)}
    
    useEffect(() => {
        fetchUsers()
        const dataTimer = setInterval(() => {
            fetchUsers()
        }, aTimeout)
        return () => clearInterval(dataTimer)
    }, [])

    const fetchUsers = async () => {
        const APIURL = '/api/v2/admin/list-users'
        let res = await authenticatedFetch(APIURL)
        if (res.users) {
            setUsers(res.users.map((val,index)=>{
                return {
                    id: index,
                    ...val,
                }
            }))
        } else if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

    const handleOnCellClick = (e, row)=>{
        console.debug(e, row)
        if (row.target.type == 'checkbox') {
            if (row.target.checked) {
                setSelectedRows([...new Set([...selectedRows, event.id])])
            } else {
                setSelectedRows([
                    ...new Set(selectedRows.filter((x) => x !== event.id)),
                ])
            }
        }
    }

    const handleUserClick = () => {
        console.debug(selectedRows)
    }

    const handleSelectionModelChange = (newSelection) => {
        console.debug('Selected changes', newSelection)
        setSelectionModel(newSelection)
        setSelectedRows(newSelection)
    }

    return (
        <React.Fragment>
            <Typography variant="h5"> User Administration</Typography>
            <Button onClick={toggleGridDisplay}>Click to expand</Button>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 50,
                    paddingBottom: 20,
                }}
            >
                <Button color="success" onClick={handleUserClick}>
                    Archive
                </Button>
                <Button color="warning" onClick={handleUserClick}>
                    Cancel
                </Button>
                <Button color="error" onClick={handleUserClick}>
                    Delete
                </Button>
            </div>
            <DataGrid
                style={gridOpen? {display:'flex'}:{display:'none'}}
                rows={users}
                columns={columns}
                disableSelectionOnClick
                components={{
                    BaseCheckbox: CheckboxWrapper,
                }}
                checkboxSelection
                onCellClick={handleOnCellClick}
                onSelectionModelChange={handleSelectionModelChange}
                selectionModel={selectionModel}
            />
        </React.Fragment>
    )
}

export default UserList