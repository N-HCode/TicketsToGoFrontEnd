import React, { useState, createContext } from 'react';

const TicketColumnsContext = createContext();

const TicketColumnsContextProvider = (props) => {
    const [ ticketColumnsContext, setTicketColumnsContext] = useState([
        {
            templateName:"New Tab",
            columnNames: "NEW"
        },
        {
            templateName:"TEST",
            columnNames: "NEW"
        },
        {
            templateName:"DREAM",
            columnNames: "NEW"
        }
    ]);

    return (
        <TicketColumnsContext.Provider
            value={ [ticketColumnsContext, setTicketColumnsContext] }
        > 
           {props.children}
       </TicketColumnsContext.Provider>
    )
}

export { TicketColumnsContext, TicketColumnsContextProvider };