import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Modal, TextareaAutosize, TextField
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'react-i18next';

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
  };

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
    const [open, setOpen] = useState(false);
    const [uInput, setUInput] = useState('')
    const [timerValue, setTimerValue] = useState(getStoredTimer)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenNavMenu = (event) => {setAnchorElNav(event.currentTarget)}
    const handleCloseNavMenu = () => {setAnchorElNav(null)}
    const navigate = useNavigate()
    const {t} = useTranslation(['main'])


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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Work in progress...
                </Typography>
                <Typography id="modal-modal-description" component="div" sx={{ mt: 2 }}>
                    <div>
                    You can specify additional arguments here, do not add
                    newlines or line carriages (Tab/Enter) just one big string
                        <div>
                            EX:{' '}
                            <code>
                                --nossl1 --notls1 --gmail2 --folder
                                &quot;INBOX&quot;
                            </code>
                        </div>
                    </div>
                    <p>
                        If you need to encase a variable/parameter please use double
                        quotes &quot; ... &quot; and not single &apos; ... &apos;
                    </p>
                    <p>
                        Please refer to{' '}
                        <a
                            href="https://imapsync.lamiral.info/#doc"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Imapsync FAQ/Doc
                        </a>
                    </p>
                    <TextareaAutosize
                        aria-label="textarea for extra arguments"
                        minRows={5}
                        placeholder={'--arg1 --arg2'}
                        style={{ width: '95%', margin: "auto", border: "2px solid #000"}}
                        value={uInput}
                        onInput={(e) => setUInput(e.target.value)}
                    />
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
                </Typography>
            </Box>
            </Modal>
        <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Pymap
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="main menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                            </Menu>
                        </Box>
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
                                    } }
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {t("menu." + page.toLowerCase())}
                                </Button>
                            ))}
                            <Button
                                key={"options"}
                                onClick={handleOpen}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {t('menu.options')}
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            </React.Fragment>
    )
}
export default ResponsiveAppBar
