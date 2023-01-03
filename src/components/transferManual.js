import React, { useState, useEffect, useRef } from 'react'
import { Stack, Container, IconButton, Icon, Button } from '@mui/material'

import { ManualSyncComponent } from './manualSyncComponent.js'

export function TransferManual() {
    // UNFINISHED
    const [listCount, setListCount] = useState(1)
    const syncButtonRef = useRef(null)

    let componentsToRender = Array.from({ length: listCount }, (_, i) => i + 1)

    const scrollToSyncButton = () => {
        syncButtonRef.current &&
            syncButtonRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const changeCount = (opr, increment) => {
        if (opr == 'plus') {
            let newCount = listCount + increment
            setListCount(newCount)
        } else if (opr == 'minus' && listCount > increment) {
            let newCount = listCount - increment
            setListCount(newCount)
        } else {
            console.error(`Unkown operation ${opr}`)
        }
    }

    useEffect(() => {
        scrollToSyncButton()
    }, [listCount])

    return (
        <Container>
            <Stack>
                {componentsToRender.map((i) => (
                    <ManualSyncComponent key={i} />
                ))}
            </Stack>
            <IconButton
                onClick={() => {
                    changeCount('minus', 1)
                }}
                style={{ float: 'left', marginTop: '1em' }}
            >
                <Icon>expand_less</Icon>
            </IconButton>
            <IconButton
                onClick={() => {
                    changeCount('plus', 1)
                }}
                style={{ float: 'right', marginTop: '1em' }}
            >
                <Icon>expand_more</Icon>
            </IconButton>
            <Button
                ref={syncButtonRef}
                style={{ marginTop: '4em' }}
                onClick={() => {
                    alert('This is not implemented yet')
                }}
            >
                Start Sync
            </Button>
        </Container>
    )
}
