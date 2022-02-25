import React, {useState} from 'react'
import { Stack, Container } from '@mui/material'
import { IconButton, Icon } from '@mui/material';

import ManualSyncComponent from './manualSyncComponent.js'

export default function TransferManual() {
    const [listCount, setListCount] = useState(1)
    let componentsToRender = Array.from({length: listCount}, (_, i) => i + 1)


    const changeCount = (opr,increment) => {
        if (opr == "plus") {
            let newCount = listCount + increment
            setListCount(newCount)
        } else if (opr == "minus" && listCount > increment) {
            let newCount = listCount - increment
            setListCount(newCount)
        } else {console.error(`Unkown operation ${opr}`)}
    }


    return (
        <Container>
            <Stack>
                { componentsToRender.map( (i) => <ManualSyncComponent key={i}/> )}
            </Stack>
            <IconButton onClick={()=>{changeCount("minus", 1)}} style={{float: "left", marginTop: "1em"}}>
                <Icon >expand_less</Icon>
            </IconButton>
            <IconButton onClick={()=>{changeCount("plus", 1)}} style={{float: "right", marginTop: "1em"}}>
                <Icon >expand_more</Icon>
            </IconButton>
        </Container>
    )
}