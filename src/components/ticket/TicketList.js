import React, { useState, useEffect } from 'react'
import Ticket from './Ticket';
import { findAll } from '../../services/TicketService';

const TicketList = () => {
    // created temp data for testing because the plan is to use the Context Hook here to pull in the data
    // to pass down to each individual ticket component

    // The state that will hold the data from api
    const [ticketList, setTicketList] = useState([]);

    // Component did mount and update useEffect to watch for the length value of ticketList
    useEffect(() => {
        // add a listener for ticketList
        let isMounted = true;
        window.addEventListener('tickets', ticketList)
        
        if(isMounted){
            findAll()
            .then( data => setTicketList(data) )
        }

        // remove when component switches out
        return () => {
            isMounted = false;
            window.removeEventListener('tickets', ticketList)
        }
    })

       // mapping through the array to create a ticket component for each object in the array
    return (
        <div>
            {ticketList.length > 0 ? ticketList.map( ticket => <Ticket ticket={ticket} key={ticket.ticketNumber} />  ): <p>Currently no Tickets Exists</p> }
        </div>
    )
}

export default TicketList;


// temp test data
// {
//     subject: "subject of testTicket1",
//     description: "description of testTicket1",
//     ticketNumber: "0001",
//     ticketOwner: {firstName: "Pepega"}
// },
// {
//     subject: "subject of testTicket2",
//     description: "description of testTicket2",
//     ticketNumber: "0002",
//     ticketOwner: {firstName: "Sadge"}
// },
// {
//     subject: "subject of testTicket2",
//     description: "description of testTicket2",
//     ticketNumber: "0003",
//     ticketOwner: {firstName: "Kappa"}
// }