import React, {useState} from "react"
import { DataGrid } from '@mui/x-data-grid'
import { Button } from "@mui/material";
import authenticatedFetch from '../../utils/apiFetcher'

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

    const [users, setUsers] = useState([])
    

    const fetchUsers = async () => {
        const APIURL = '/api/v2/admin/list-users'
        let res = await authenticatedFetch(APIURL)
        if (res.users) {
            setUsers[res.users]
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
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[8]}
                onCellClick={handleOnCellClick}
                checkboxSelection
                
            />
            <Button onClick={fetchUsers}>Fetch</Button>
        </React.Fragment>
    )
}

export default UserList