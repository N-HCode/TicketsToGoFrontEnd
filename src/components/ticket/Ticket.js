import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { OpenTicketContext} from '../context/OpenTicketContext';
import { PrimaryNavSelectedContext } from '../context/PrimaryNavSelectedContext';
import { editTicket } from '../../services/TicketService';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {

    const [primaryNavSelectedContext, setPrimaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const ticketTabState = primaryNavSelectedContext.array[primaryNavSelectedContext.index]

    // deconstructing props
    let ticket = props.ticket;
    const [oldTicketstate, setOldTicketstate] = useState(ticket);
    const [ticketstate, setTicketstate] = useState(ticket);
    const [openTicketState, setOpenTicketState] = useContext(OpenTicketContext);


    //This is the state of whether or not the item is being dragged.
    //We will use this to style the object when it is dragged based on its state.

    const addTicketTabAndOpenModal = () => {
        
        //We only want 1 ticket tab for each ticket. So we check if the ticket number is NOT included
        if (!ticketTabState.state.ticketTab.includes(ticket.ticketNumber)) {
            ticketTabState.state.ticketTab.push(ticket.ticketNumber);
            const newState = primaryNavSelectedContext.array.slice(0);
            setPrimaryNavSelectedContext({
                ...primaryNavSelectedContext,
                array: newState

            })
        }

        setOpenTicketState(ticket.id);
        props.openTicketModal();

    }

    useEffect(() => {

        //this is how we can compare two objects
        if(JSON.stringify(oldTicketstate) !==  JSON.stringify(ticketstate)){
            
            editingTicket(ticketstate);
        }

    }, [ticketstate])
 

    const editingTicket = async (newTicketState) => {
        
        try {
            
            await editTicket(ticket.id, newTicketState);
            console.log("HELLOTHERE")
            setOldTicketstate(newTicketState);
            console.log("HELLOTHERE2")
        } catch (error) {
            
        }
    }

    
    const dragStart = (e) => {
        e.target.classList.add("dragging");
    }



    const onDragEnd = (e) => {
        e.target.classList.remove("dragging");
        const columnTitle = e.target.parentElement.parentElement.children[0].querySelector("p").innerHTML
        setTicketstate({
            ...ticketstate,
            status: columnTitle
        })
        
    }

    return (

        <div 

            id={"ticket_number_" + ticket.ticketNumber}
            className="single_ticket" 
            onClick={addTicketTabAndOpenModal}
            onDragStart={dragStart}
            // onDragOver={dragOver}
            onDragEnd={onDragEnd}
            // onDrop={drop}
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
            <p>Subject: {ticket.subject}</p>
        </div>
    )
}

export default Ticket;