import React, { useState, createContext } from 'react'

const TicketContext = createContext();

const TicketProvider = (props) => {
    const [ tickets, setTickets ] = useState([])

    return (
        <TicketContext.Provider
            value={ [tickets, setTickets] }
        > 
           {props.children}
       </TicketContext.Provider>
    )
}

export { TicketContext, TicketProvider };
