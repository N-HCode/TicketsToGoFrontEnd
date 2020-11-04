import React from 'react';
import { useDrop } from 'react-dnd';
import { DataTypes } from '../../../../datatypes/ticketdata';

const SingleColumnTicketContainer = (props) => {

    //to make this into a droppable container we use the
    //dnd useDrop hook

    const[extraProps,drop] = useDrop({
        //accept is a required property for useDrop
        //This will tell what datatype this droppable container
        //accepts
        accept: DataTypes.TICKET,
        //ondrop do what. Will take item and monitor
        drop: (item, monitor) => console.log(item),
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <div className="ticket_list_container" 
        ref={drop}
        style={{background: extraProps.isOver? "green" : "blue"}}
        >
            {props.children}
        </div>
    )
}

export default SingleColumnTicketContainer
