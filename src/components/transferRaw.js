import React, {useState} from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

export default function TransferRaw() {
  const APIURL = "/APIV1"
  const [input, setInput] = useState(''); // '' is the initial state value

  const handleChange = () => {
    // Split the lines
    const DATA = input.split(/\r?\n/)
    // make API POST
    const params={
      headers:{
        "content-type":"application/json; charset=UTF-8"
      },
      body:DATA,
      method:"POST"
    }
    fetch(APIURL,params).then(data => {
      console.log(data.json())
    }).then(res=>{console.log(`Response: ${res}`)})
    .catch(err=>console.log(`Error: ${err}`))

  }

    return (
      <React.Fragment>
        <TextareaAutosize
          aria-label="empty textarea"
          minRows={5}
          placeholder="test@email.com Password123"
          style={{ width: "100%" }}
          value={input}
          onInput={e => setInput(e.target.value)}
      />
      <Button onClick={handleChange}>Start Sync</Button>
      </React.Fragment>
    );
  }