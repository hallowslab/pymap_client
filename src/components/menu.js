import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Button,
    Modal,
    TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { UserMenu } from './menuUser'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const pages = ['Sync', 'Tasks']

function getStoredArgs() {
    let extraArgs = localStorage.getItem('extraArgs')
    if (extraArgs) {
        return extraArgs
    }
    return ''
}

function getStoredTimer() {
    let timerValue = localStorage.getItem('timerValue')
    if (timerValue) {
        return timerValue
    }
    return 20000
}

const ResponsiveAppBar = () => {
    const [open, setOpen] = useState(false)
    const [uInput, setUInput] = useState('')
    const [timerValue, setTimerValue] = useState(getStoredTimer)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const navigate = useNavigate()
    const { t } = useTranslation(['main'])

    useEffect(() => {
        setUInput(getStoredArgs())
        setTimerValue(getStoredTimer())
    }, [])

    const saveToLocalStorage = () => {
        try {
            localStorage.setItem('extraArgs', uInput)
            localStorage.setItem('timerValue', timerValue)
        } catch (e) {
            alert('Unexpected error occured')
        }
    }

    const handleNavigation = (page) => {
        let new_page = page.toLowerCase()
        navigate(new_page)
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Other options</h2>
                    <TextField
                        id="logs-refresh-timer"
                        label="Refresh Timer"
                        helperText="Time between API requests in MS"
                        defaultValue={timerValue}
                        onChange={(e) => {
                            setTimerValue(e.target.value)
                        }}
                    />
                    <Button onClick={saveToLocalStorage}>Save</Button>
                </Box>
            </Modal>
            <AppBar position="static" style={{ marginBottom: '2em' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Pymap
                        </Typography>

                        <Typography
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            Pymap
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => {
                                        handleNavigation(page)
                                    }}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {t('menu.' + page.toLowerCase())}
                                </Button>
                            ))}
                            <Button
                                key={'options'}
                                onClick={handleOpen}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {t('menu.options')}
                            </Button>
                            <Button
                                key={'DavMail Proxy'}
                                onClick={handleOpen}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Davmail Proxy
                            </Button>
                        </Box>
                        <UserMenu/>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    )
}
export default ResponsiveAppBar

export function NoMenu() {
    return (
        <AppBar position="static" sx={{ marginBottom: '2em' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Pymap
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
