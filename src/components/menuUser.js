import React, {useState} from 'react'

import {
    Menu,
    MenuItem,
    Box
} from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import authenticatedFetch from '../utils/apiFetcher';
import handleTokenExpiration from '../utils/handleTokenExpiration';

export const UserMenu = () => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const navigate = useNavigate();
    
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    
    const performLogout = async ()=>{
        const APIURL = '/api/v2/blacklist-token'
        let res = await authenticatedFetch(APIURL)
        if (res.error == 'ExpiredAccessError') {
            handleTokenExpiration()
        } else if (res.token_allowed) {
            handleTokenExpiration()
        } else {
            console.error(`API Error: ${res.error}`)
        }
    }

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
            <MenuItem onClick={()=>{
                handleClose()
                performLogout()
            }}>Logout</MenuItem>
        </Menu>
    </div>
);
}