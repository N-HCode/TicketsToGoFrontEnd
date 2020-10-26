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
    return (
        <div className="single_ticket" onClick={addTicketTab}>
            <Link to={`/edit/${ticket.ticketNumber}`}><h4>{ticket.subject}</h4></Link>
            <p>Ticket #{ticket.ticketNumber}</p>
            {/* <p>Owner: {ticket.ticketOwner.firstName}</p> */}
            <p>Description: {ticket.description}</p>
        </div>
    )
}

export default Ticket;