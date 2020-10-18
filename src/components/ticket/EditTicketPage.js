import React, { useState, useEffect } from 'react'
import { findTicket, editTicket, deleteTicket } from '../../services/TicketService'

// Going to do an api call based on the param passed in the url 
// to get data back and then populate state that way to
// trickle down to the fields and implement a on-change and save button to submit the form
const EditTicketPage = (props) => {
    const ticketId= props.match.params.id;

    const [ticket, setTicket] = useState({
        ticketNumber: "",
        subject: "",
        description: "",
        priority: "",
        userContact:"",
        userPhoneNumber:"",
        userEmail:""
    })

    useEffect(() => {
        let isMounted = true;

        if(isMounted){
           findTicket(ticketId)
            .then(
               data => setTicket(data)
            ) 
            
        }        
        return () => {
            isMounted = false;
        }
    },[])

    // the method that runs when the save button is hit
    const handleSave = (event) => {
        event.preventDefault();
        // {ask if they are sure they want to save}
        let confirm = window.confirm("Are you sure you want to submit your changes?");

        // if they do call api here and edit the ticket and then redirect
        if( confirm ){
            editTicket(ticket.ticketNumber, ticket)
            .then(
                props.history.push("/")
            )
        }else{
            return;
        }
    }

    const handleDelete = (event) => {
        console.log("delete")
        // stop the reload of page when button or action is pressed
        event.preventDefault();
        let confirm = window.confirm("Are you sure you want to delete this ticket?");
        if(confirm){
            deleteTicket(ticket.ticketNumber)
            .then(
                props.history.push("/")
            )
        }else{
            return;
        }
    }

    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            This is the editing ticket page
            {/* {for subject} */}
            
            <form>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input  type="text" required name="subject" value={ticket.subject} onChange={onChange}></input>
                </div>

                {/* {for description} */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="3" cols="40" value={ticket.description} onChange={onChange}></textarea>
                </div>

                {/* {for priority} */}
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" value={ticket.priority} onChange={onChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="escalate">Escalate</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="contactName">Contact Name:</label>
                    <input  type="text" required name="userContact" value={ticket.userContact} onChange={onChange}></input>
                </div>

                {/* {for description} */}
                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input  type="text" required name="userPhoneNumber" value={ticket.userPhoneNumber} onChange={onChange}></input>
                </div>

                 {/* {for description} */}
                 <div>
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input  type="text" required name="userEmail" value={ticket.userEmail} onChange={onChange}></input>
                </div>
                {/* {button for submitting the form } */}
                <button type="submit" onClick={handleSave}>Save</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default EditTicketPage

    
    
   