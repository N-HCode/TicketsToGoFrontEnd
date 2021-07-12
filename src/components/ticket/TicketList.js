import React, {useEffect, useRef } from 'react'
import Ticket from './Ticket';


const TicketList = (props) => {
    
    // created temp data for testing because the plan is to use the Context Hook here to pull in the data
    // to pass down to each individual ticket component

    // The state that will hold the data 

    // Component did Mount

    useEffect(() => {
        // empty dependancy array to mount component one time
        // empty dependancy array to mount component one time
    },[props])

    const ticketListContainer = useRef();

    const dragOver = (e) => {
        e.preventDefault();
      
        const container = ticketListContainer.current;
        console.log(container);
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggedObject = document.querySelector('.dragging');
        console.log(afterElement);
        if (afterElement == null || afterElement == undefined) {
            container.appendChild(draggedObject);
        }else{
            container.insertBefore(draggedObject,afterElement);
        }

    }

    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.single_ticket:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2;

            //if offset is postive then we are at the bottom of the list
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child}
            }else{
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }

  
            
    return (

        <div ref={ticketListContainer}
        onDragOver={dragOver}
        style={{'width': "100%"}}
        >
            {props.ticketList.length > 0 && props.ticketList.map( ticket => <Ticket ticket={ticket} key={ticket.ticketNumber+"_"+props.columnNumber} 
                openTicketModal={props.openTicketModal}
            
            
            />  ) }

        </div>
    )
}

export default TicketList;


