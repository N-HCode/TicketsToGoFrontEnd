import React, { useState, useContext} from 'react';
import TicketList from '../../ticket/TicketList';
import { TicketContext } from '../../context/TicketContext';
import SingleColumnTitle from './singlecolumncomponents/SingleColumnTitle';
import SingleColumnTicketContainer from './singlecolumncomponents/SingleColumnTicketContainer'
import {TicketColumnsContext} from '../../context/TicketColumnsContext';

const SinglePrimaryTab = (props) => {

   // const [ tickets ] = useContext(TicketContext);
    const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);

    const [ticketColumnTitle, setTicketColumnTitle] = useState({
        title: ticketColumnListState[props.keynumber].title,
        ticketList: ticketColumnListState[props.keynumber].ticketList,
        isEdit: false
    });

   // const [ticketColumnTicketList, setTicketColumnTicketList] = useState(tickets.filter( ticket => ticket.status == ticketColumnTitle.title));
    


    const checkTickets = () => {
        console.log(ticketColumnListState[props.keynumber].ticketList)
    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keynumber}>
            <SingleColumnTitle 
                ticketColumnIndex = {props.keynumber}
                ticketColumnTitle={ticketColumnTitle}
                setTicketColumnTitle={setTicketColumnTitle}
            />

            <SingleColumnTicketContainer
                ticketColumnIndex = {props.keynumber}
                ticketColumnTitle={ticketColumnTitle}
                setTicketColumnTitle={setTicketColumnTitle}
                hoverTicketColumn={props.hoverTicketColumn}
                hoverTicketIndex={props.hoverTicketIndex}
                

            >
                Template/TicketList
                { 
                    ticketColumnListState[props.keynumber].ticketList.length > 0 && 
                        <TicketList 
                        ticketColumnTicketList={ ticketColumnListState[props.keynumber].ticketList }
                        ticketColumnIndex = {props.keynumber}
                        hoverTicketColumn={props.hoverTicketColumn}
                        hoverTicketIndex={props.hoverTicketIndex}
 
                    />
                    
                }           
            </SingleColumnTicketContainer>
           

                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;