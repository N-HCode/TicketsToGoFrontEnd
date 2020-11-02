import React from 'react';

const SingleTicketTab = (props) => {

    return(
        // onMouseDown is the middle mouse button click.
        <div className="single_ticket_tab" key={"ticket_tab_"+ props.keynumber} onMouseDown={(e) => props.middleMouseDeleteTab(e,props.keynumber)}>
            <p>Ticket#{props.ticketNumber}</p>
            <i className="material-icons" onClick={() => props.deleteTab(props.keynumber)}>close</i>
        </div>

    );


}

export default SingleTicketTab;