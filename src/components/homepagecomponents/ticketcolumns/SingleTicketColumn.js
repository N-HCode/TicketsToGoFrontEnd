import React, { useState, useContext} from 'react';
import TicketList from '../../ticket/TicketList';
import { TicketContext } from '../../context/TicketContext';
import SingleColumnTitle from './singlecolumncomponents/SingleColumnTitle';
import SingleColumnTicketContainer from './singlecolumncomponents/SingleColumnTicketContainer'

const SinglePrimaryTab = (props) => {

    const [ tickets ] = useContext(TicketContext);

    const [ticketColumnTitle, setTicketColumnTitle] = useState({
        title: "new",
        isEdit: false
    });

    const [ticketColumnTicketList, setTicketColumnTicketList] = useState(tickets.filter( ticket => ticket.status == ticketColumnTitle.title));
    


    const checkTickets = () => {
        console.log(tickets)
    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keynumber}>
            <SingleColumnTitle 
                ticketColumnTitle={ticketColumnTitle}
                setTicketColumnTitle={setTicketColumnTitle}
            />

            <SingleColumnTicketContainer
                ticketColumnIndex = {props.keynumber}

            >
                Template/TicketList
                { 
                    tickets.length > 0 && 
                        <TicketList 
                        ticketColumnTicketList={ ticketColumnTicketList }
                        setTicketColumnTicketList={setTicketColumnTicketList}
                        ticketColumnIndex = {props.keynumber}
 
                    />
                    
                }           
            </SingleColumnTicketContainer>
           

                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;