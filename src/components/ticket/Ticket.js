import React, { useState,useContext, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { DataTypes } from '../../datatypes/ticketdata';
import {TicketTabContext} from '../context/TicketTabContext';

// The Component for the display of each individual ticket on the ticketList
// Props is used to hold data and carry it down
const Ticket = (props) => {
    // deconstructing props
    const ticket = props.ticket;

    const ref = useRef(null);

    //useDrag is from DND that. We get an object of the extra props from the collecting functions
    //We also get a ref, which is used to bind the useDrag to that component.
    const [extraProps, drag] = useDrag({
        //it takes in the itemtype or datatype of the item
        item: {
            //type is required, but you can pass other data in here
            type: DataTypes.TICKET,
            index: props.ticketIndex,
            columnIndex: props.ticketColumnIndex
        },
        //this collect functions will get information from the DOM
        //and then pass it to our extraProps object
        collect: monitor => ({
            //monitor has a property that isDragging
            isDragging: monitor.isDragging(),
            
        })

    });


    const [, drop] = useDrop({
        accept: DataTypes.TICKET,
        hover: (item, monitor) => {
            
            props.hoverTicketColumn.current=props.ticketColumnIndex;
            props.hoverTicketIndex.current=props.ticketIndex;
        }
    })

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

    //This is how to wrap the drop in the drag. So that we can use both hooks in one ref
    drag(drop(ref))

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