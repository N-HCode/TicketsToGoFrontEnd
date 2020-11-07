import React, { useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {TicketTabContext} from '../context/TicketTabContext';
import { TicketContext } from '../context/TicketContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    const [ tickets ] = useContext(TicketContext);



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

    
    const dragStart = (e) => {
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id);
        //we only need the index of the ticket to be passed. Since we are taking it from
        //the ticket context anyways. Ticket number will not always be the index.
        //Sometimes tickets get loaded in different order.
        e.dataTransfer.setData('ticket_index', tickets.indexOf(ticket));
        setTimeout( ()=> {
            target.style.opacity = ".5";
        }, 0)
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    const onDragEnd = (e) => {
        e.target.style.opacity = "1";
    }


    return (

        <div 

            id={ticket.ticketNumber}
            className="single_ticket" 
            onClick={addTicketTab}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={onDragEnd}

            draggable="true"

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
                draggable="false"
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