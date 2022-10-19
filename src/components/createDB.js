import { Button } from '@mui/material'
import React from 'react'


export default function CreateDB() {

    let handleCall = () => {
        const APIURL = '/api/v2/createdb'
        const params = {
            headers: { accepts: 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    alert("Database Instantiated")
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
