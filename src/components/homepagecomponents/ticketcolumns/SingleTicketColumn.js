import React, { useState, useContext, useEffect } from 'react';
import TicketList from '../../ticket/TicketList';
import {NavLink} from 'react-router-dom';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { TicketContext } from '../../context/TicketContext'

const SinglePrimaryTab = (props) => {

    const [ tickets ] = useContext(TicketContext);
    

    const [ticketColumnTitle, setTicketColumnTitle] = useState({
        ...props.ticketColumn,
        isEdit: false,

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
        // setTicketList(user.tickets.filter( ticket => ticket.status == ticketColumnTitle.title))
    }

    const checkTickets = () => {
        console.log(tickets)
    }

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';
        card.style.opacity = '1';
        e.target.appendChild(card);
        // const ticket = e.dataTransfer.getData('ticket');
        tickets[e.dataTransfer.getData('ticket_number')].status = ticketColumnTitle.title;
        console.log(tickets);

       
    }

    const dragOver = (e) => {
        e.preventDefault();

    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keynumber}>

           
            <div className="column_title">
                <i className="material-icons" onClick={editTitle} >edit</i>
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
            <div className="ticket_list_container"
                id={props.key}
                onDrop={drop} 
                onDragOver={dragOver}
            
            >
                Template/TicketList
                { 
                    tickets.length > 0 && 
                        <TicketList 
                        id={props.id}
                        status={ticketColumnTitle.status}
                        ticketList={ tickets.filter( ticket => ticket.status == ticketColumnTitle.title) }
                    />
                    
                }
            </div>
                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;