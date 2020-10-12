import React, { useState } from 'react'
import Ticket from './Ticket';

const TicketList = () => {
    // created temp data for testing because the plan is to use the Context Hook here to pull in the data
    // to pass down to each individual ticket component

    const [ticketList, setTicketList] = useState(
        [
            {
                subject: "subject of testTicket1",
                description: "description of testTicket1",
                ticketNumber: "0001",
                ticketOwner: {firstName: "Pepega"}
            },
            {
                subject: "subject of testTicket2",
                description: "description of testTicket2",
                ticketNumber: "0002",
                ticketOwner: {firstName: "Sadge"}
            },
            {
                subject: "subject of testTicket2",
                description: "description of testTicket2",
                ticketNumber: "0003",
                ticketOwner: {firstName: "Kappa"}
            }

    ]
       );
       // mapping through the array to create a ticket component for each object in the array
    return (
        <div>
            { ticketList.map( ticket => <Ticket ticket={ticket} key={ticket.ticketNumber} />  ) }
        </div>
    )
}

export default TicketList;