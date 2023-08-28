import React, {useState} from 'react'

import {
    Menu,
    MenuItem,
    Box
} from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

return (
    <div>
        <Box sx={{cursor:'pointer'}} onClick={handleOpen}>
            <PersonIcon/>
        </Box>
        <Menu
            id="user-list-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={()=>{
                navigate('profile')
                handleClose()
            }}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
    </div>
);
}