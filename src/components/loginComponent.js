import { Button } from '@mui/material'
import React from 'react'


export default function LoginComponent() {

    let handleCall = () => {
        const params = {
            headers: { accepts: 'application/json' },
            method: 'POST',
        }
        fetch('/login', params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    console.log(`Token -> ${res.token}`)
                } else if (res.error) {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    return (
        <React.Fragment>
            <Button onClick={handleCall}>Instantiate Database</Button>
        </React.Fragment>
    )
}
