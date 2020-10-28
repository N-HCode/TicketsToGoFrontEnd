import React, { useState, useContext } from 'react';
import { createTicket } from '../../services/TicketService';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const CreateTicketPage = (props) => {
    
    // get user Context to know who is creating the ticket
    const [user] = useContext(UserContext);

    // Declare a ticket State 
    const [ticket, setTicket] = useState({
        subject: "",
        description: "",
        priority: "low",
        status: "new"
    });

     // the method that runs when the create button is hit
    const onSubmit = (event) => {
         // stop the reload of page when event is triggerd
         event.preventDefault();
         
        // ask if they are sure they want to save
        let confirm = window.confirm("Are you sure you want to create this ticket?");

        // if they do confirm call api here and create the ticket and then redirect, else do nothing
        if( confirm ){
           
            axios.post(
                createTicket,
                ticket,
                { params: { userId: user.details.userId}}
            )
            .then( props.history.push("/") )
            .catch( err => alert(err) )
        }else{
            return;
        }
    }
    
    // To change the state everytime the value of the inputs are changed
    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    return (
        // form for creating tickets
            <form onSubmit={onSubmit}>
                <div className="form-container">

                    {/* Instructions */}
                    <h1>Create a new ticket</h1>
                    <p>Please fill in this form to create a new ticket.</p>
                    <hr></hr>

                    {/* Subject */}
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" name="subject" onChange={onChange}></input>

                    {/* Description */}
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="3" cols="40" onChange={onChange} ></textarea>

                    {/* Priority */}
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" onChange={onChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="escalate">Escalate</option>
                    </select>

                    {/* Status */}
                    <label htmlFor="status">Status:</label>
                    <select name="status" onChange={onChange}>
                        <option value="new">new</option>
                        <option value="in progress">in progress</option>
                        <option value="resolved">resolved</option>
                    </select>

                    {/* Submit */}
                    <button type="submit" >Create</button>
                </div>
            </form>
    )
}

export default CreateTicketPage

// removed useEffect

//   // this is to call the service on the form is submited and the state changes
//   useEffect(() => {
//     let isMounted = true;
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();
//    if(ticket.subject.length > 0 && isMounted) {
//        axios.post(createTicket,
//            ticket,
//            { params: { userId: user.userId} }
//        ).then(props.history.push("/"))
//        .catch(err => alert(err))
//    }
//        console.log("proc")
  
//    return () => {
//        // clean up
//        source.cancel()
//        isMounted = false;
//    }
//    // the trigger on this useEffect is the ticket state
// }, [ticket])