import React, {useContext} from 'react';
import { OpenTicketContext} from '../../context/OpenTicketContext';

const SingleTicketTab = (props) => {

    const [openTicketState, setOpenTicketState] = useContext(OpenTicketContext);

    const onClick = () => {
        setOpenTicketState(props.ticketNumber);
        props.openTicketModal();
    }

    return(
        // onMouseDown is the middle mouse button click.
        <div className="single_ticket_tab" 
        key={"ticket_tab_"+ props.keynumber} 
        onMouseDown={(e) => props.middleMouseDeleteTab(e,props.keynumber)}
        onClick={() => onClick()}>
            <p>Ticket#{props.ticketNumber}</p>
            <i className="material-icons" onClick={() => props.deleteTab(props.keynumber)}>close</i>
        </div>

    );


}

export default SingleTicketTab;