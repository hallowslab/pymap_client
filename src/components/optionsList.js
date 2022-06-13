import React, { useEffect, useState } from 'react'
import {Button, Box, TextareaAutosize, LinearProgress} from '@mui/material'

function getStoredInput () {
    let extraArgs = localStorage.getItem("extraArgs")
    //console.log(extraArgs)
    if (extraArgs) {
        //console.log("Reached here because")
        //console.log(extraArgs)
        return extraArgs
    }
    return ""
}


function OptionsList() {
    const [uInput, setUInput] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(()=>{
        setUInput(getStoredInput())
    }, [])

    const saveToLocalStorage = () => {
        setSaving(true)
        try {
            localStorage.setItem("extraArgs", uInput)
            setSaving(false)
        } catch(e) {
            alert("Unexpected error occured")
        }

    }

    return(
        <React.Fragment>
            {saving === true ? <LinearProgress style={{margin: '0.5em'}}/> : <span/>}
            <Box sx={{ maxWidth: "95vw", margin: "auto", bgcolor: 'background.paper' }}>
                <h2>Work in Progress....</h2>
                <div>
                    You can specify additional arguments here, do not add newlines or line carriages (Tab/Enter) just one big string
                    <div>EX:{" "}<code>--nossl1 --notls1 --gmail2 --folder &quot;INBOX&quot;</code></div>
                </div>
                <p>If you need to encase a variable/parameter please use double quotes &quot; ... &quot; and not single &apos; ... &apos;</p>
                <p>Please refer to <a href='https://imapsync.lamiral.info/#doc' target="_blank" rel="noreferrer">Imapsync FAQ/Doc</a></p>
                <TextareaAutosize
                            aria-label="textarea for extra arguments"
                            minRows={5}
                            placeholder={"--arg1 --arg2"}
                            style={{ width: '100%' }}
                            value={uInput}
                            onInput={(e) => setUInput(e.target.value)}
                        />
            </Box>
            <Button onClick={saveToLocalStorage}>Save</Button>
        </React.Fragment>
    )
}


export {getStoredInput, OptionsList}