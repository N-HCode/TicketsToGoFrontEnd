import React, { useState, createContext } from 'react';

const OpenTicketContext = createContext();

const OpenTicketContextProvider = (props) => {
    const [ openTicketContext, setOpenTicketContext ] = useState(null);

    return (
        <OpenTicketContext.Provider
            value={ [openTicketContext, setOpenTicketContext] }
        > 
           {props.children}
       </OpenTicketContext.Provider>
    )
}

export { OpenTicketContext, OpenTicketContextProvider };
