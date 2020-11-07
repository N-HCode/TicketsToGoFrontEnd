import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {TicketTabContext} from '../context/TicketTabContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    const [ticketTabListState, setTicketTabListState] = useContext(TicketTabContext);

    const addTicketTab = () => {
        
        //The setState will only re-render if a new object is setted.
        //Thus we have to create a new array from the old one.
        //one way to do this is to use the .slice(0)
        //https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newTicketTabList = ticketTabListState.slice(0);
        newTicketTabList.push("hello");
        setTicketTabListState(newTicketTabList);
    }

    // Showing the parts from each Ticket Object that will be printed out here

    
    const dragStart = (e) => {
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id)
        e.dataTransfer.setData('ticket', JSON.stringify(ticket))
        setTimeout( ()=> {
            target.style.display = "none";
        }, 0)
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    return (
        <div 
            id={ticket.ticketNumber}
            className="single_ticket" 
            onClick={addTicketTab}
            onDragStart={dragStart}
            onDragOver={dragOver}
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