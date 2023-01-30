import React, {useEffect, useState} from 'react'
import { Tabs, Tab, Box } from '@mui/material'

import { TransferRaw } from '../components/transferRaw.js'
import { TransferManual } from '../components/transferManual.js'
import { useTranslation } from 'react-i18next'

function a11yProps(index) {
    return {
        id: `sync-tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}

export default function Transfer() {
    const {t} = useTranslation(['main'])
    const [value, setValue] = useState(0)
    const timerValue = localStorage.getItem('timerValue')
        ? localStorage.getItem('timerValue')
        : 20000

    const heartbeat = () => {
        const APIURL = '/api/v2/heartbeat'
        const params = {
            headers: { accepts: 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            method: 'GET',
        }
        fetch(APIURL, params)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                if (res.message) {
                    console.log(res.message)
                } else if (res.error == "ExpiredAccessError") {
                    alert("Access expired, removing token...")
                    console.error("Access expired, removing token...")
                    localStorage.removeItem("token")
                    navigate("/")
                    window.location.reload()
                } else {
                    console.error(`API Error: ${res.error} -> ${res.message}`)
                }
            })
            .catch((err) => console.log(`Error: ${err}`))
    }

    useEffect(() => {
        heartbeat()
        const dataTimer = setInterval(() => {
            heartbeat()
        }, timerValue)
        return () => clearInterval(dataTimer)
    }, [])

    let mainContent = <TransferRaw />

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }

    if (value === 0) {
        mainContent = <TransferRaw />
    } else {
        mainContent = <TransferManual />
    }

    return (
        <Box sx={{ width: '100%', height: '70vh'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="sync tabs"
                >
                    <Tab label={t("sync.raw")} {...a11yProps(0)} />
                    <Tab label={t("sync.manual")} {...a11yProps(1)} />
                </Tabs>
            </Box>
            {mainContent}
        </Box>
    )
}
