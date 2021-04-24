import React, { useState, createContext } from 'react';

const TicketColumnsContext = createContext();

const TicketColumnsContextProvider = (props) => {
    const [ ticketColumnsContext, setTicketColumnsContext] = useState([
        {
            templateName:"New Tab",
            columnStates: [{
                title: "TOOOM"
                ,isEdit: false
            }],
         
        },
        {
            templateName:"TEST",
            columnStates: [{
                title: "ZOOM"
                ,isEdit: false
            },{
                title:"FHUIAFHI"
                ,isEdit: false
            }
        
        ],
        },
        {
            templateName:"DREAM",
            columnStates: [{
                title: "DOOOM"
                ,isEdit: false
            }],
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