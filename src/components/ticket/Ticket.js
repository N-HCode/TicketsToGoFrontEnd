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
    const [isBeingDragged, setIsBeingDragged] = useState(false);

    const addTicketTab = () => {
        
        //We only want 1 ticket tab for each ticket. So we check if the ticket number is NOT included
        if (!ticketTabListState.includes(ticket.ticketNumber)) {
            let newTicketTabList = ticketTabListState.slice(0);
            newTicketTabList.push(ticket.ticketNumber);
            setTicketTabListState(newTicketTabList);
        }

    }


    //when first dragging the object do this.
    const onDragStart = (e, ticketColumn,ticketIndex) =>{
        props.draggedItem.current = e.target;
        props.draggedItemIndex.current = ticketIndex;
        props.draggedItemTicketColumn.current = ticketColumn;
       //We use this set timeout so that the item's state is update asynchronous
       //This allows us to get the drag ghost element styled as "single_ticket"
       //before it changes to the style "drag_style"
       setTimeout(()=>{
        setIsBeingDragged(true);
       },0)
    }

    const onDragEnter = (e, ticketColumn, ticketIndex) => {
        //on Drag Enter fires from the other element and not the one that is being dragged
        console.log(e.currentTarget);
        console.log(props.draggedItem.current);
        console.log(props.draggedItem.current != e.target);

        if (props.draggedItem.current != e.target) {
            props.setTicketColumnTicketList(
                oldList => {
                    let newList = oldList.slice(0);
                    newList.splice(ticketIndex,0,
                        props.draggedItemTicketColumn.current
                            .splice(props.draggedItemIndex,1)[0]
                        );
                        props.draggedItemTicketColumn.current = ticketColumn;
                        props.draggedItemIndex.current = ticketIndex;
                    return newList;
                }
            )
        }
    }

    const handleDragEnd = () => {
        props.draggedItem.current = null;
        props.draggedItemIndex.current = null;
        setIsBeingDragged(false);
    }

    const dragStyle = () => {
        return "drag_style"
    }


    // Showing the parts from each Ticket Object that will be printed out here
    return (
        //we want to make the style dynamic depending on whenever the item is being
        //dragged. So we can use a ternary (shorthand if statement) for this.
        <div className={isBeingDragged?"single_ticket":"single_ticket"}
        // the draggable tag will make it so that there is a ghost item when you drag it
        draggable
        onDragStart={(e) => onDragStart(e, props.ticketColumnTicketList, props.ticketIndex)}
        onDragEnd={handleDragEnd}
        //When you drag the ticket onto another ticket, the ticket you drag on will
        //be the one firing this function. NOT the ticket you are draging.
        //this way we can get the OTHER ticket's position.
        onDragEnter={(e) => onDragEnter(e, props.ticketColumnTicketList, props.ticketIndex)}
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