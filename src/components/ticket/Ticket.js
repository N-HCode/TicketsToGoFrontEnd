import React from 'react'

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    // Showing the parts from each Ticket Object that will be printed out here
    return (
        <div>
            <h4>{ticket.subject}</h4>
            <p>Ticket #{ticket.ticketNumber}</p>
            <p>Owner: {ticket.ticketOwner.firstName}</p>
            <p>Description: {ticket.description}</p>
        </div>
    )
}

export default Ticket;