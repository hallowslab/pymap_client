import React, {useEffect, useState} from 'react'
import {Stack, Link, Modal, Typography, Box} from '@mui/material'
import { useParams } from 'react-router-dom'


export function LogsComponent() {
    let {taskID} = useParams()
    const [logs, setLogs] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = () => {
        const APIURL = `/api/v1/tasks/${taskID}`
            const params = {
                headers: { 'accepts': 'application/json' },
                method: 'GET',
            }
            fetch(APIURL, params)
                .then((data) => {
                    return data.json()
                })
                .then((res) => {
                    if (res.logs) {
                        setLogs(res.logs)
                    }
                    else if (res.error) {
                        console.error(`API Error: ${res.error} -> ${res.message}`)
                    }
                })
                .catch((err) => console.log(`Error: ${err}`))
    }

    const fetchLog = (logPath) => {
        const APIURL = `api/v1/tasks/${taskID}/${logPath}`
        const params = {
            headers: { 'accepts': 'application/json' },
            method: 'GET',
        }
        fetch(APIURL, params).then((data)=>{
            return data.json()
        }).then((res)=> {
            if (res.content) {
                return res
            } else if (res.error) {console.error(`API Error: ${res.error} -> ${res.message}`)}
        }).catch((err) => console.log(`Error: ${err}`))
    }

    const LogModal = (logPath) => {
        let content = fetchLog(logPath)
        console.log(content)
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
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box> 
                </Modal>
            </React.Fragment>
        )
        
    }


    useEffect( () => {
        fetchData()
        const dataTimer = setInterval(()=>{
            fetchData()
        }, 20000)
        return () => {clearInterval(dataTimer)}
     }, [])


    return(
        <React.Fragment>
            <LogModal/>
            <Stack spacing={2}>
                <h2>Log files</h2>
                {logs?.map( (val, index) => <Link key={"log_"+index} onClick={handleOpen()}>{val}</Link> )}
            </Stack>
        </React.Fragment>
    )
}