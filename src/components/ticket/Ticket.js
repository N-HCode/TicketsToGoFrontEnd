import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {TicketTabContext} from '../context/TicketTabContext';
import { TicketContext } from '../context/TicketContext';
import { OpenTicketContext} from '../context/OpenTicketContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    const [ tickets ] = useContext(TicketContext);
    const [ticketTabListState, setTicketTabListState] = useContext(TicketTabContext);
    const [openTicketState, setOpenTicketState] = useContext(OpenTicketContext);
    //This is the state of whether or not the item is being dragged.
    //We will use this to style the object when it is dragged based on its state.

    const addTicketTabAndOpenModal = () => {
        
        //We only want 1 ticket tab for each ticket. So we check if the ticket number is NOT included
        if (!ticketTabListState.includes(ticket.ticketNumber)) {
            let newTicketTabList = ticketTabListState.slice(0);
            newTicketTabList.push(ticket.ticketNumber);
            setTicketTabListState(newTicketTabList);
        }

        setOpenTicketState(ticket.ticketNumber);
        props.openTicketModal();

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

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.opacity = '1';
        e.target.parentNode.appendChild(card);
        // tickets[e.dataTransfer.getData('ticket_index')].status = ticketColumnTitle.title;
        console.log(tickets);

    }


    return (

        <div 

            id={"ticket_number_" + ticket.ticketNumber}
            className="single_ticket" 
            onClick={addTicketTabAndOpenModal}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={onDragEnd}
            onDrop={drop}
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