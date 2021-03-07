import React, { useState, createContext } from 'react'

const VerifyStatusContext = createContext();

const VerifyStatusProvider = (props) => {
    const [ status, setStatus ] = useState(false)

    return (
        <VerifyStatusContext.Provider
            value={ [status, setStatus] }
        > 
           {props.children}
       </VerifyStatusContext.Provider>
    )
}

export { VerifyStatusContext, VerifyStatusProvider };
