import React, { useState, useEffect } from 'react';
import { createTicket } from '../../services/TicketService';

// useHistory method for redirecting back to pages

const CreateTicketPage = (props) => {
    const [ticket, setTicket] = useState({
        subject: "",
        description: "",
        priority: "",
        userContact:"",
        userPhoneNumber:"",
        userEmail:""
    });

     // the method that runs when the create button is hit
    const handleCreate = (event) => {
        // {ask if they are sure they want to save}
        let confirm = window.confirm("Are you sure you want to create this ticket?");

        // if they do call api here and edit the ticket and then redirect
        if( confirm ){
            event.preventDefault();
            setTicket({
                ...ticket,
                subject: event.target.subject.value,
                description: event.target.description.value,
                priority: event.target.priority.value,
                userContact: event.target.userContact.value,
                userPhoneNumber: event.target.userPhoneNumber.value,
                userEmail: event.target.userEmail.value
            })
        }else{
            return;
        }
    }
    
    // this is to call the service on the form is submited and the state changes
    useEffect(() => {
        // if the state changes
        if(ticket.subject.length > 0)
        // then call the createTicket service/api
        createTicket(ticket)
        // afterwards go back to home page
        return () => {
            props.history.push("/")
        }

        // the trigger on this useEffect is the ticket state
    }, [ticket])

    return (
        <div>
            This is the create ticket page
            {/* {for subject} */}
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" name="subject"></input>
                </div>

                {/* {for description} */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="3" cols="40"></textarea>
                </div>

                {/* {for priority} */}
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="escalate">Escalate</option>
                    </select>
                </div>

                 {/* {for description} */}
                <div>
                    <label htmlFor="contactName">Contact Name:</label>
                    <input  type="text" required name="userContact"></input>
                </div>

                {/* {for description} */}
                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input  type="text" required name="userPhoneNumber"></input>
                </div>

                 {/* {for description} */}
                 <div>
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input  type="text" required name="userEmail"></input>
                </div>

                  {/* {button for submitting the form } */}
                <button type="submit" >Create</button>
            </form>
        </div>
    )
}

export default CreateTicketPage
