import React, { useState, useContext } from 'react';
import { createTicket } from '../../services/TicketService';
import { UserContext } from '../context/UserContext';
import { TicketContext } from '../context/TicketContext';
import {StatusListContext} from '../context/StatusListContext';
import {PriorityListContext} from '../context/PriorityListContext';
import ClientOrgModal from './clientorgmodal/ClientOrgModal';
import {SelectedOrgContext} from '../../../context/SelectedOrgContext';


import axios from 'axios';

const CreateTicketPage = (props) => {
    
    // get user Context to know who is creating the ticket
    const [user] = useContext(UserContext);
    const [tickets, setTickets ] = useContext(TicketContext);

    const [statusList] = useContext(StatusListContext);
    const [priorityList] = useContext(PriorityListContext);

    // Declare a ticket State 
    const [ticket, setTicket] = useState({
        ticketNumber: null,
        subject: null,
        description: null,
        resolution: null,
        priority: priorityList[0],
        ticketNotes: null,
        responses: null,
        status: statusList.currentStatus,
        assignedTo: null
    });

    const [selectedOrgContext] = useContext(SelectedOrgContext);

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
                { params: { userId: user.userId}}
            )
            .then( response => setTickets( [ ...tickets, response.data] ))
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
        });
        // console.log(ticket);      
    }

    const [openClientOrgModal, setopenClientOrgModal] = useState(false)

    const openFindModal = () =>{
        setopenClientOrgModal(true);
    }

    const closeFindModal = () =>{
        setopenClientOrgModal(false);
    }


    return (
        // form for creating tickets
        <div>

                <ClientOrgModal openClientOrgModal={openClientOrgModal} closeFindModal={closeFindModal} />


       
                <form onSubmit={onSubmit}>
                    <div className="ticket_form_container">
                        <div>



                        {/* Instructions */}
                        <h1>Create a new ticket</h1>
                        <p>Please fill in this form to create a new ticket.</p>
                        <hr></hr>

                        <div className="ticket_form__allsides">
                            <div className="ticket_form__oneside">

                                {/* client organization */}

                                <label htmlFor="client_organization">Client Organization:</label>
                                <select type="text" name="client_organization" onClick={openFindModal} onChange={onChange}></select>

                                

                                {/* Subject */}
                                
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" name="subject" onChange={onChange}></input>

                                {/* Description */}
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" rows="3" cols="40" onChange={onChange} ></textarea>

                                {/* Priority */}
                                <label htmlFor="priority">Priority:</label>
                                <select name="priority" onChange={onChange} >
                                <option value={priorityList[0]} disabled>{priorityList[0]}</option>
                                    {priorityList.map((priority, index) => 
                                        <option
                                            key = {"new_ticket_priority_list_option" + index}
                                            value={priority}

                                        >{priority} </option>)
                                    }
                                </select>


                            </div>
                            <div className="ticket_form__oneside">

                                {/* client organization */}

                                <label htmlFor="contact">Contact:</label>
                                <select type="text" name="contact" onChange={onChange}></select>

                                {/* Ticket Owner */}
                                
                                <label htmlFor="assignedTo">Assigned To:</label>
                                <input type="text" name="assignedTo" defaultValue={user.fullName} readOnly></input> 


                                {/* Resolution */}
                                <label htmlFor="resolution">Resolution:</label>
                                <textarea name="resolution" rows="3" cols="40" onChange={onChange}></textarea>

                                {/* Status */}
                                <label htmlFor="status">Status:</label>
                                <select name="status" onChange={onChange}>
                                    <option value={statusList.currentStatus} disabled>{statusList.currentStatus}</option>
                                    {statusList.statusListArray.map((status, index) => 
                                        <option
                                            key = {"new_ticket_status_list_option" + index}
                                            value={status}

                                        >{status} </option>)
                                    }

                                </select>

                            </div>
                        </div>

                        <div ></div>

                        {/* Submit */}
                        <button type="submit" >Create</button>
                        </div> 
                    </div>
                </form>
            </div>
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