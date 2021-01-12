import React, {useContext, useRef } from 'react';
import TicketList from '../../ticket/TicketList';
import { TicketContext } from '../../context/TicketContext';
import {StatusListContext} from '../../context/StatusListContext';
import { useHistory } from "react-router-dom";
import {TicketColumnsContext} from '../../context/TicketColumnsContext'

const SinglePrimaryTab = ({selectedIndex, setState, keyIndex, columnState, openTicketModal, templateIndex}) => {

    const [ tickets ] = useContext(TicketContext);
    const [statusList, setStatusList] = useContext(StatusListContext);
    const [ticketColumnsContext, setTicketColumnsContext] = useContext(TicketColumnsContext);

    const history = useHistory();
    
    const newTitle = useRef();
    //save the currentColumn here so we can use throughout the code.

    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {
 
        //This will make it so the code will only write when the title is different from the current
        //title and that the edit button is pressed after the input is done.
        if (columnState.isEdit) {
            console.log("HERERE " + newTitle.current.value)

                columnState.title = newTitle.current.value;
                columnState.isEdit = false;
                const newTemplateContext = ticketColumnsContext.slice(0);
                setTicketColumnsContext(
                    newTemplateContext
                )
                
    

            
   
        }else{
            columnState.isEdit = true;
            const newTemplateContext = ticketColumnsContext.slice(0);
            setTicketColumnsContext(
                newTemplateContext
            )
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
        tickets[e.dataTransfer.getData('ticket_index')].status = columnState.title;

       
    }

    const dragOver = (e) => {
        e.preventDefault();

    }

    const deleteColumn = (index) => {        

        ticketColumnsContext[templateIndex].columnStates.splice(index,1);
        const newTemplateState = ticketColumnsContext.slice(0);
        setTicketColumnsContext(
            newTemplateState
        )
       
    }

    const createTicketpage = () => {
        setStatusList({
            ...statusList,
            currentStatus: columnState.title
        })

        history.push("/createTicket")

    }

    return(
        <div className="single_ticket_column" >

           
            <div className="column_title">
                <i className="material-icons edit_column_button" 
                    onClick={editTitle} >edit</i>
                
 
                {columnState.isEdit ?
                    //We want an uncontrolled input field so that it does not keep filtering tickets
                    //or make API calls whenever we type a character.
                    <input 
                    // pass in the ref here so we can reference it later
                        ref={newTitle}
                        defaultValue={columnState.title}
                        maxLength="15">
                    </input>
                     : 
                    <p>{columnState.title}</p>
                }

                {columnState.isEdit ? 
                    <i className="material-icons" onClick={() => deleteColumn(keyIndex)}> delete_outline</i>
            
                    :

                    <i className="material-icons"
                        onClick={createTicketpage}
      
                    >add</i>
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
                        key={"ticket_list_"+ keyIndex +"_column_" + keyIndex + "pri_nav" + selectedIndex}
                        status={columnState.title}
                        ticketList={ tickets.filter( ticket => ticket.status == columnState.title) }
                        openTicketModal={openTicketModal}
                    />
                    
                }
            </div>
                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;