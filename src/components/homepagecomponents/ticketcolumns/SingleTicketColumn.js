import React, { useState, useContext, useRef } from 'react';
import TicketList from '../../ticket/TicketList';
import {NavLink} from 'react-router-dom';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { TicketContext } from '../../context/TicketContext'

const SinglePrimaryTab = (props) => {

    const [ tickets ] = useContext(TicketContext);
    const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);
    
    const newTitle = useRef()
    //save the currentColumn here so we can use throughout the code.
    const currentColumn = ticketColumnListState[props.keyIndex];

    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {


        //This will make it so the code will only write when the title is different from the current
        //title and that the edit button is pressed after the input is done.
        if (currentColumn.isEdit) {

            //This will change the title in the context. So that when they leave the page
            //and come back it will still have the information.
            var newList = ticketColumnListState.slice(0);
            newList[props.keyIndex].title = newTitle.current.value;
            newList[props.keyIndex].isEdit = !newList[props.keyIndex].isEdit 
            // currentColumn.title = newTitle.current.value;
            setticketColumnList(newList);

        }else{

            var newList = ticketColumnListState.slice(0);
            newList[props.keyIndex].isEdit = !newList[props.keyIndex].isEdit;
            setticketColumnList(newList);
 
        }
        
    }


    const checkTickets = () => {
        console.log(tickets)
    }

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
  
        card.style.opacity = '1';
        e.target.appendChild(card);
        tickets[e.dataTransfer.getData('ticket_index')].status = currentColumn.title;
        console.log(tickets);

       
    }

    const dragOver = (e) => {
        e.preventDefault();

    }

    const deleteColumn = (index) => {
        console.log(index);
        let newList = ticketColumnListState.slice(0);
        console.log(newList);
        newList.splice(index,1);
        setticketColumnList(newList);
      
     
    }

    return(
        <div className="single_ticket_column" key={"single_ticket_column_" + props.keyIndex}>

           
            <div className="column_title">
                <i className="material-icons edit_column_button" 
                
                onClick={editTitle} >edit</i>
                
 
                {currentColumn.isEdit ?
                //We want an uncontrolled input field so that it does not keep filtering tickets
                //or make API calls whenever we type a character.
                <input 
                // pass in the ref here so we can reference it later
                    ref={newTitle}
                    defaultValue={currentColumn.title}
                    maxLength="15">
                </input>
                     : 
                    <p>{currentColumn.title}</p>
                }
                {currentColumn.isEdit ? 
                    <i className="material-icons" onClick={() => deleteColumn(props.keyIndex)}> delete_outline</i>
            
                    :

                    <NavLink className="material-icons"
                        to="/createTicket"         
                    >add</NavLink>
                }
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
                        status={currentColumn.title}
                        ticketList={ tickets.filter( ticket => ticket.status == currentColumn.title) }
                    />
                    
                }
            </div>
                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;