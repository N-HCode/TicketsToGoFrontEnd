import React, { useState, createContext } from 'react';

const TicketTabContext = createContext();

const TicketTabContextProvider = (props) => {
    const [ ticketTabState, setTicketTabState] = useState([]);

    return (
        <TicketTabContext.Provider
            value={ [ticketTabState, setTicketTabState] }
        > 
           {props.children}
       </TicketTabContext.Provider>
    )
}

export { TicketTabContext, TicketTabContextProvider };