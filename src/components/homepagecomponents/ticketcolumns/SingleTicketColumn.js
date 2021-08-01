import React, {useContext, useRef, useEffect, useState } from 'react';
import TicketList from '../../ticket/TicketList';
import Ticket from '../../ticket/Ticket';
import {StatusListContext} from '../../context/StatusListContext';
import { useHistory } from "react-router-dom";
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import {getTicketByStatus} from '../../../services/TicketService';


const SinglePrimaryTab = ({selectedIndex, setState, keyIndex, columnState, openTicketModal, templateIndex}) => {

  
    const [statusList, setStatusList] = useContext(StatusListContext);
    const [ticketColumnsContext, setTicketColumnsContext] = useContext(TicketColumnsContext);
    const [columnTickets, setcolumnTickets] = useState([])

    const history = useHistory();
    
    const newTitle = useRef();
    //save the currentColumn here so we can use throughout the code.

    //this is used on the pencil icon to edit the title of the
    //columns

    useEffect(() => {
        console.log("hmoshi moshi")
        getTicketsBasedOnStatus(columnState.title);
   
    }, [columnState.title])

    const getTicketsBasedOnStatus = async (status) => {
    
        
            try {

                const response = await getTicketByStatus(status);
                const newList = response.data.content;
                setcolumnTickets(newList);
                
            } catch (error) {
                console.log(error)
            }
    }


    const editTitle = () => {
 
        //This will make it so the code will only write when the title is different from the current
        //title and that the edit button is pressed after the input is done.
        if (columnState.isEdit) {

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


    // const checkTickets = () => {
    //     console.log(columnTickets)
    // }

    const drop = (e) => {
        e.preventDefault();
        // const card_id = e.dataTransfer.getData('card_id');
        // const card = document.getElementById(card_id);
  
        // card.style.opacity = '1';
        // e.target.appendChild(card);
        // columnTickets[e.dataTransfer.getData('ticket_index')].status = columnState.title;

       
    }

    // const onDragEnter = (e) => {
    //     e.stopPropagation()
    //     e.target.style.background = "purple";
    // }

    const onDragLeave= (e) => {
        e.preventDefault();
    }

  

    const dragOver = (e) => {


        let container;
        e.preventDefault();

        //This is to make sure we get the correct container.
        if(e.target.classList.contains("single_ticket")){
            container = e.target.parentElement;
        }else{
            container = e.target;
        }
        
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggedObject = document.querySelector('.dragging');
        
       if (afterElement == null || afterElement == undefined) {
            container.appendChild(draggedObject);
       }else{
           container.insertBefore(draggedObject,afterElement);
       }

    }

    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.single_ticket:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2;

            //if offset is postive then we are at the bottom of the list
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child}
            }else{
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
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

                    <select name="status" defaultValue={columnState.title} ref={newTitle}>
                        
                            {statusList.statusListArray.map((status, index) => {

                                
                                return (<option
                                key = {"status_list_option" + index}
                                value={status}

                                >{status} </option>)


                            })}
                            
                    </select>
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
                key={"ticket_list_container_" + keyIndex}
                onDrop={drop} 
                // onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={dragOver}
            
            >
              
                { 
                    columnTickets.length > 0 && columnTickets.map( 
                        
                        
                        ticket => <Ticket ticket={ticket} key={ticket.ticketNumber+"_"+keyIndex} 
                    openTicketModal={openTicketModal} />)
                    //     <TicketList 
                    //     key={"ticket_list_"+ keyIndex +"_column_" + keyIndex + "pri_nav" + selectedIndex}
                    //     columnNumber={keyIndex}
                    //     status={columnState.title}
                    //     ticketList={ columnTickets }
                    //     openTicketModal={openTicketModal}
                    
                    
                }
            </div>
                
                {/* <button onClick={checkTickets}>check tickets</button> */}
        </div>
    );
}

export default SinglePrimaryTab;