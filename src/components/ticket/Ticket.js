import React, { useState,useContext, useRef} from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { DataTypes } from '../../datatypes/ticketdata';
import {TicketTabContext} from '../context/TicketTabContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    //useDrag is from DND that. We get an object of the extra props from the collecting functions
    //We also get a ref, which is used to bind the useDrag to that component.
    const [extraProps, drag] = useDrag({
        //it takes in the itemtype or datatype of the item
        item: {
            //type is required, but you can pass other data in here
            type: DataTypes.TICKET
        },
        //this collect functions will get information from the DOM
        //and then pass it to our extraProps object
        collect: monitor => ({
            //monitor has a property that isDragging
            isDragging: monitor.isDragging()
        })

    });

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

        <div className="single_ticket"
        ref={drag}
        style={{opacity: extraProps.isDragging? "0.3" : "1"}}
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