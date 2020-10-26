import React, { useState } from 'react';
import TicketList from '../../ticket/TicketList';
import {NavLink} from 'react-router-dom';

const SinglePrimaryTab = (props) => {

    const [ticketColumnTitle, setTicketColumnTitle] = useState({
        title: "Title Here",
        isEdit: false
        
    });

    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {

        setTicketColumnTitle({
            //spread operator to keep the original values and not override them
            //then you enter in the property you want to override
            ...ticketColumnTitle,
            isEdit: !ticketColumnTitle.isEdit})
    }

    //this onchange function takes the value of the input and
    //update the state of the title every time you change
    //the input real time.
    const onChange = (e) => {
        setTicketColumnTitle({
            ...ticketColumnTitle,
            title: e.target.value
        })
    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keynumber}>
           

            <div className="column_title">
                <i className="material-icons" onClick={editTitle}>edit</i>
                {ticketColumnTitle.isEdit ?
                <input 
                    onChange={onChange} 
                    value={ticketColumnTitle.title}
                    maxLength="15">
                </input>
                     : 
                    <p>{ticketColumnTitle.title}</p>
                }
                <NavLink className="material-icons"
                    to="/createTicket"
                    style={{color: 'white', textDecoration: "none"}}
                
                >add</NavLink>
            </div>
            <div className="ticket_list_container">
                Template/TicketList
                <TicketList />
            </div>

        </div>
    );


}

export default SinglePrimaryTab;