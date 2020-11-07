import React, {useContext, useEffect} from 'react';
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
      

            if (ticketColumnListState[item.columnIndex].ticketList[item.index] == undefined) {
                return;
            }

            if(props.hoverTicketColumn.current != null){
                
                ticketColumnListState[props.hoverTicketColumn.current].ticketList
                    .push(ticketColumnListState[item.columnIndex].ticketList[item.index]);

                ticketColumnListState[item.columnIndex].ticketList.splice(item.index,1);

                var newList = ticketColumnListState.slice(0);
                setticketColumnList(newList);

                props.hoverTicketColumn.current = null

            }else{

                ticketColumnListState[props.ticketColumnIndex].ticketList
                    .push(ticketColumnListState[item.columnIndex].ticketList[item.index]);

                ticketColumnListState[item.columnIndex].ticketList.splice(item.index,1)
                var newList = ticketColumnListState.slice(0);
                setticketColumnList(newList);

            }


        
        },
        hover: (item, monitor) => {
            if(ticketColumnListState[props.ticketColumnIndex].ticketList.length <= 0){
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
