import React, {useContext} from 'react';
import { useDrop } from 'react-dnd';
import { DataTypes } from '../../../../datatypes/ticketdata';
import {TicketColumnsContext} from '../../../context/TicketColumnsContext';

const SingleColumnTicketContainer = (props) => {


    const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);

    //to make this into a droppable container we use the
    //dnd useDrop hook
    const[extraProps,drop] = useDrop({
        //accept is a required property for useDrop
        //This will tell what datatype this droppable container
        //accepts
        accept: DataTypes.TICKET,
        //ondrop do what. Will take item and monitor. Item is the item being dragged
        drop: (item, monitor) => {
            console.log(item.index); console.log(item.columnIndex)

            if (ticketColumnListState[item.columnIndex].tickets[item.index] == undefined) {
                return;
            }

            if(props.hoverTicketColumn.current != null){
                ticketColumnListState[props.hoverTicketColumn.current].tickets
                    .push(ticketColumnListState[item.columnIndex].tickets[item.index]);

                ticketColumnListState[item.columnIndex].tickets.splice(item.index,1)

                props.hoverTicketColumn.current = null

            }else{

                ticketColumnListState[props.ticketColumnIndex].tickets
                    .push(ticketColumnListState[item.columnIndex].tickets[item.index]);

                ticketColumnListState[item.columnIndex].tickets.splice(item.index,1)

            }


        
        },
        hover: (item, monitor) => {
            if(ticketColumnListState[props.ticketColumnIndex].tickets.length <= 0){
                console.log("IN HERE")
                props.hoverTicketColumn.current=null;
                props.hoverTicketIndex.current=null;
            }

        },
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
