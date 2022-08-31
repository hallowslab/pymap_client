import React, { useState } from 'react'
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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const pages = ['Sync', 'Tasks']

const ResponsiveAppBar = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleNavigation = (page) => {
        let new_page = page.toLowerCase()
        navigate(new_page)
    }

    return (
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
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            key={"options"}
                            onClick={() => {
                                window.open('/options','_blank')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            options
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
