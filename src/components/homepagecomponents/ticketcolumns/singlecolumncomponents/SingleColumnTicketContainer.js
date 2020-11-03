import React from 'react';

const SingleColumnTicketContainer = (props) => {



    return (
        <div className="ticket_list_container">
            {props.children}
        </div>
    )
}

export default SingleColumnTicketContainer
