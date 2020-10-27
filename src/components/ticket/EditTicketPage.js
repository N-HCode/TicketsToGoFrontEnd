import React, { useState } from 'react'
import { editTicket, deleteTicket } from '../../services/TicketService'

import axios from 'axios';

// Going to do an api call based on the param passed in the url 
// to get data back and then populate state that way to
// trickle down to the fields and implement a on-change and save button to submit the form
const EditTicketPage = (props) => {

    // define the ticket state that can be filled out/edited
    // the ticket state is passed down from props when the <Link/> component is clicked
    const [ticket, setTicket] = useState(
        props.location.state.ticket
    )

    // the method that runs when the save button is hit
    const onSave = (event) => {
        // stop the reload of page when event is triggerd
        event.preventDefault();

        // ask if they are sure they want to save
        let confirm = window.confirm("Are you sure you want to submit your changes?");

        // if they do confirm call api here and edit the ticket and then redirect, else do nothing
        if( confirm ){
            axios.put(
                editTicket + ticket.ticketNumber,
                ticket
            )
            .then(
                props.history.push("/")
            ).catch( err => alert(err) )
        }else{
            return;
        }
    }

    const onDelete = (event) => {
        // stop the reload of page when event is triggerd
        event.preventDefault();

        // ask if they are sure they want to delete
        let confirm = window.confirm("Are you sure you want to delete this ticket?");

        // if they do confirm call api here and delete the ticket and then redirect, else do nothing
        if(confirm){
            axios.delete(
                deleteTicket + ticket.ticketNumber
            )
            .then(
                props.history.push("/")
            ).catch( err => alert(err) )
        }else{
            return;
        }
    }

    // onChange to change the state of the ticket everytime the user writes in the input
    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form>
            <div className="form-container">

                {/* Ticket number */}
                <h3>Ticket Number: {ticket.ticketNumber}</h3>
                <hr></hr>

                {/* Subject */}
                <label htmlFor="subject">Subject:</label>
                <input  type="text" required name="subject" value={ticket.subject} onChange={onChange}></input>
             
                {/* Description */}
                <label htmlFor="description">Description:</label>
                <textarea name="description" rows="3" cols="40" value={ticket.description} onChange={onChange}></textarea>
                
                {/* Priority */}
                <label htmlFor="priority">Priority:</label>
                <select name="priority" value={ticket.priority} onChange={onChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="escalate">Escalate</option>
                </select>
   
                {/* button for saving changes to ticket */}
                <button type="submit" onClick={onSave}>Save</button>

                {/* button for deleting the ticket  */}
                <button type="button" onClick={onDelete}>Delete</button>
            </div>
        </form>
    )
}

export default EditTicketPage

    
    
   