import React, {useContext, useRef } from 'react';
import TicketList from '../../ticket/TicketList';
import { TicketContext } from '../../context/TicketContext';
import {StatusListContext} from '../../context/StatusListContext';
import { useHistory } from "react-router-dom";

const SinglePrimaryTab = ({selectedIndex,state, setState, keyIndex, columnData, openTicketModal}) => {

    const [ tickets ] = useContext(TicketContext);
    const [statusList, setStatusList] = useContext(StatusListContext);

    const history = useHistory();
    
    const newTitle = useRef();
    //save the currentColumn here so we can use throughout the code.

    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {

        //This will make it so the code will only write when the title is different from the current
        //title and that the edit button is pressed after the input is done.
        if (columnData.isEdit) {


                const newColumns = state.columns.slice(0);
                newColumns[keyIndex].title = newTitle.current.value;
                newColumns[keyIndex].isEdit = false;
                setState({
                    ...state,
                    columns: newColumns
                })
                
    

            
   
        }else{

            
            const newColumns = state.columns.slice(0);
            newColumns[keyIndex].isEdit = true;
            setState({
                ...state,
                columns: newColumns
            })
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
        tickets[e.dataTransfer.getData('ticket_index')].status = state.columns[keyIndex].title;

       
    }

    const dragOver = (e) => {
        e.preventDefault();

    }

    const deleteColumn = (index) => {        
        // console.log(index);
        const newColumns = state.columns.slice(0);
        // console.log(newList);
        newColumns.splice(index,1);
        setState({
            ...state,
            columns: newColumns
        })
       
    }

    const createTicketpage = () => {
        setStatusList({
            ...statusList,
            currentStatus: columnData.title
        })

        history.push("/createTicket")

    }

    return(
        <div className="single_ticket_column" >

           
            <div className="column_title">
                <i className="material-icons edit_column_button" 
                    onClick={editTitle} >edit</i>
                
 
                {columnData.isEdit ?
                    //We want an uncontrolled input field so that it does not keep filtering tickets
                    //or make API calls whenever we type a character.
                    <input 
                    // pass in the ref here so we can reference it later
                        ref={newTitle}
                        defaultValue={columnData.title}
                        maxLength="15">
                    </input>
                     : 
                    <p>{columnData.title}</p>
                }

                {columnData.isEdit ? 
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
                        status={columnData.title}
                        ticketList={ tickets.filter( ticket => ticket.status == columnData.title) }
                        openTicketModal={openTicketModal}
                    />
                    
                }
            </div>
                
                <button onClick={checkTickets}>check tickets</button>
        </div>
    );
}

export default SinglePrimaryTab;