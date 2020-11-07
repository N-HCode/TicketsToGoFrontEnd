import React, { useState, useContext, useRef } from 'react';
import TicketList from '../../ticket/TicketList';
import {NavLink} from 'react-router-dom';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { TicketContext } from '../../context/TicketContext'

const SinglePrimaryTab = (props) => {

    const [ tickets ] = useContext(TicketContext);
    const [ticketColumnListState] = useContext(TicketColumnsContext);
    

    const [ticketColumnTitle, setTicketColumnTitle] = useState({
        ...props.ticketColumn
    });

    //will be using it to reference a component
    const newTitle = useRef()
    
    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {


        //This will make it so the code will only write when the title is different from the current
        //title and that the edit button is pressed after the input is done.
        if (ticketColumnTitle.isEdit) {
            //Whenever we use a ref, we need the .current to get the current value
            setTicketColumnTitle({
                //spread operator to keep the original values and not override them
                //then you enter in the property you want to override
                title: newTitle.current.value,
                isEdit: !ticketColumnTitle.isEdit})

            //This will change the title in the context. So that when they leave the page
            //and come back it will still have the information.
            ticketColumnListState[props.keyIndex].title = newTitle.current.value;

        }else{

            setTicketColumnTitle({
                //spread operator to keep the original values and not override them
                //then you enter in the property you want to override
                ...ticketColumnTitle,
                isEdit: !ticketColumnTitle.isEdit})
    

        }
        
    }

    // //this onchange function takes the value of the input and
    // //update the state of the title every time you change
    // //the input real time.
    // const onChange = (e) => {
    //     setTicketColumnTitle({
    //         ...ticketColumnTitle,
    //         title: e.target.value
    //     })
    //     // setTicketList(user.tickets.filter( ticket => ticket.status == ticketColumnTitle.title))
    // }

    const checkTickets = () => {
        console.log(tickets)
    }

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
  
        card.style.opacity = '1';
        e.target.appendChild(card);
        tickets[e.dataTransfer.getData('ticket_index')].status = ticketColumnTitle.title;
        console.log(tickets);

       
    }

    const dragOver = (e) => {
        e.preventDefault();

    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keyIndex}>

           
            <div className="column_title">
                <i className="material-icons" onClick={editTitle} >edit</i>
                {ticketColumnTitle.isEdit ?
                //We want an uncontrolled input field so that it does not keep filtering tickets
                //or make API calls whenever we type a character.
                <input 
                // pass in the ref here so we can reference it later
                    ref={newTitle}
                    defaultValue={ticketColumnTitle.title}
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
                onDrop={drop} 
                onDragOver={dragOver}
            
            >
                Template/TicketList
                { 
                    tickets.length > 0 && 
                        <TicketList 
                        id={props.keyIndex}
                        status={ticketColumnTitle.title}
                        ticketList={ tickets.filter( ticket => ticket.status == ticketColumnTitle.title) }
                    />
                    
                }
            </div>
                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;