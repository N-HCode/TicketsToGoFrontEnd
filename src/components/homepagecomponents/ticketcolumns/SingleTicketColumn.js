import React, { useState, useEffect } from 'react';
import TicketList from '../../ticket/TicketList';

const SinglePrimaryTab = (props) => {


    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keynumber}>
           

            <div className="column_title">
                <i className="material-icons">edit</i>
                <p>TITLE HERE</p>
                <i className="material-icons">add</i>
            </div>
            <div className="ticket_list_container">
                Template/TicketList
                <TicketList />
            </div>

        </div>
    );


}

export default SinglePrimaryTab;