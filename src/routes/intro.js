import React from 'react'
import CreateDB from '../components/createDB'


export default function Intro() {


    return (
        <React.Fragment>
            <h1>Welcome to Pymap</h1>
            <div>
                Here lies a basic description that will briefly explain how to
                use the tool
            </div>
            <div>Insert sample text</div>
            <CreateDB/>
        </React.Fragment>
    )
}
