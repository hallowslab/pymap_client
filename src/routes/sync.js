import * as React from 'react'
import { Tabs, Tab, Box } from '@mui/material'

import { TransferRaw } from '../components/transferRaw.js'
import { TransferManual } from '../components/transferManual.js'

function a11yProps(index) {
    return {
        id: `sync-tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}

export default function Transfer() {
    const [value, setValue] = React.useState(0)

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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="sync tabs"
                >
                    <Tab label="Raw Input" {...a11yProps(0)} />
                    <Tab label="Manual" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {mainContent}
        </Box>
    )
}
