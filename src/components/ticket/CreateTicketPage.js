import React, { useState, useEffect, useContext } from 'react';
import { createTicket } from '../../services/TicketService';
import { UserContext } from '../context/UserContext';

// useHistory method for redirecting back to pages

const CreateTicketPage = (props) => {
    
    const [user] = useContext(UserContext);
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
            })
        }else{
            return;
        }
    }
    
    // this is to call the service on the form is submited and the state changes
    useEffect(() => {
        let isMounted = true;
        // if the state changes
        if(ticket.subject.length > 0 && isMounted)

        // then call the createTicket service/api
        // afterwards go back to home page after 1 second after getting a response from api
            {  
                createTicket(user.userId, ticket)
                .then( 
                    props.history.push("/")
            )
                // setTimeout( ()=> {props.history.push("/")}, 1000));
        // afterwards go back to home page
            }
        return () => {
            // clean up
            isMounted = false;
        }
        // the trigger on this useEffect is the ticket state
    }, [ticket])

    return (
            <form onSubmit={handleCreate}>
                <div className="form-container">
                    <h1>Create a new ticket</h1>
                    <p>Please fill in this form to create a new ticket.</p>
                    <hr></hr>

                    <label htmlFor="subject">Subject:</label>
                    <input type="text" name="subject"></input>
            
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="3" cols="40"></textarea>
               
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="escalate">Escalate</option>
                    </select>
                
                    <button type="submit" >Create</button>

                </div>
            </form>
    )
}

export default CreateTicketPage

   // userContact: event.target.userContact.value,
                // userPhoneNumber: event.target.userPhoneNumber.value,
                // userEmail: event.target.userEmail.value
                   {/* <label htmlFor="contactName">Contact Name:</label>
                    <input  type="text" required minLength="5" name="userContact"></input>
                
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input  type="text" required name="userPhoneNumber"></input>
            
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input  type="email" required name="userEmail"></input> */}
               