import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    Container,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import handleTokenExpiration from '../utils/handleTokenExpiration'

export default function LoginForm(props) {
    const [showPassword, setShowPassword] = React.useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    
    const handleCall = async () => {
        const APIURL = '/api/v2/login'
        if (user == '' || password == '') {
            alert(
                'Your input seems to be invalid, please check the console log'
            )
            console.log('Username: ', user)
            console.log('Password: ', password)
            return
        }
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: user, password: password }),
        }
        const response = await fetch(APIURL, params)
        let data = await response.json()
        if (data.error) {
            handleTokenExpiration()
            props.tokenFunc('')
        } else if (data.access_token) {
            localStorage.setItem('token', data.access_token)
            props.tokenFunc(data.access_token)
            navigate('/sync')
            window.location.reload()
        } else {
            console.log(`API Error: ${data.error}`)
        }
    }

    const handleInputs = (e) => {
        e.preventDefault()
        if (e.target.id == 'username') {
            setUser(e.target.value)
        } else if (e.target.id == 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <Container>
            <Card sx={{ maxWidth: '25vw', minHeight: '10vh', margin: 'auto' }}>
                <CardContent>
                    <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="Username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            label="Username"
                            onChange={(e) => handleInputs(e)}
                        />
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => handleInputs(e)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button onClick={handleCall}>Login</Button>
                </CardActions>
            </Card>
        </Container>
    )
}
