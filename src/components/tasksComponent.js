import React, {useEffect, useState} from 'react'
import {Stack, Link} from '@mui/material'



export function TasksComponent() {
    const [tasks, setTasks] = useState(null)

    const fetchData = () => {
        const APIURL = '/api/v1/tasks'
        const params = {
            headers: { 'accepts': 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.tasks) {
                    setTasks(res.tasks)
                }
                else if (res.error) {console.error(`API Error: ${res.error} -> ${res.message}`)}
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect( () => {
        fetchData()
        const dataTimer = setInterval(() => {
            fetchData()
        }, 20000)
        return () => clearInterval(dataTimer)
     }, [])



    return(
        <React.Fragment>
            <Stack spacing={2}>
                <h2>Latest tasks</h2>
                { tasks?.map( (val, index) => <Link key={"task_"+index} href={`tasks/${val}`}>{val}</Link> )}
            </Stack>
        </React.Fragment>
    )
}