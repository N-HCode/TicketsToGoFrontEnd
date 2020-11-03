import React, { useState,useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import {TicketTabContext} from '../context/TicketTabContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    const [ticketTabListState, setTicketTabListState] = useContext(TicketTabContext);
    //This is the state of whether or not the item is being dragged.
    //We will use this to style the object when it is dragged based on its state.

    const addTicketTab = () => {
        
        //We only want 1 ticket tab for each ticket. So we check if the ticket number is NOT included
        if (!ticketTabListState.includes(ticket.ticketNumber)) {
            let newTicketTabList = ticketTabListState.slice(0);
            newTicketTabList.push(ticket.ticketNumber);
            setTicketTabListState(newTicketTabList);
        }

    }




 




    // Showing the parts from each Ticket Object that will be printed out here
    return (
        //we want to make the style dynamic depending on whenever the item is being
        //dragged. So we can use a ternary (shorthand if statement) for this.
        <div className="single_ticket"
        // the draggable tag will make it so that there is a ghost item when you drag it
        draggable
        //When you drag the ticket onto another ticket, the ticket you drag on will
        //be the one firing this function. NOT the ticket you are draging.
        //this way we can get the OTHER ticket's position.
        onClick={addTicketTab}
        key={"single_ticket_" + ticket.ticketNumber}
        >
            <Link 
                // This is how to pass data from a Link when clicking on the Link
                // Storing the object called ticket into a state object 
                // props.location.state.ticket will be where the ticket is located in props
                to={
                    { 
                        pathname: `/edit/${ticket.ticketNumber}`,
                        state: {ticket}
                    }
                } 
            >
                <h4>{ticket.subject}</h4>
            </Link>
            <p>Ticket #{ticket.ticketNumber}</p>
            {/* <p>Owner: {ticket.ticketOwner.firstName}</p> */}
            <p>Description: {ticket.description}</p>
        </div>
    )
}

export default Ticket;