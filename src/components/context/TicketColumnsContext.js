import React, { useState, createContext } from 'react';

const TicketColumnsContext = createContext();

const TicketColumnsContextProvider = (props) => {
    const [ ticketColumnsContext, setTicketColumnsContext] = useState([]);

    return (
        <TicketColumnsContext.Provider
            value={ [ticketColumnsContext, setTicketColumnsContext] }
        > 
           {props.children}
       </TicketColumnsContext.Provider>
    )
}

export { TicketColumnsContext, TicketColumnsContextProvider };