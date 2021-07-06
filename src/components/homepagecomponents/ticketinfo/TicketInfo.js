import React, {useState, useContext, useEffect, useRef} from 'react';
import Modal from 'react-modal';


//Contexts
import { OpenTicketContext} from '../../context/OpenTicketContext';
import { StatusListContext } from '../../context/StatusListContext';
import { PriorityListContext} from '../../context/PriorityListContext';

//Services
import {getTicketById, closeTicket, editTicket} from '../../../services/TicketService';
import {getUserById} from '../../../services/UserService';

//Other
import {TICKETERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';

Modal.setAppElement('#root');



const TicketInfo = ({ticketIsOpen, closeTicketModal}) => {
    
    //openTicketConext is to tell which ticket is currently active and which one we should show data for.
    const [openTicketState] = useContext(OpenTicketContext);

    //This context is to populate the status list. This is a context because we want status to be consistent
    //throughout the user session.
    const [statusList] = useContext(StatusListContext);

    const [priorityList] = useContext(PriorityListContext);

    //We only want a save button to appear if the user change something. So we need
    //a reference to the old ticket data to compare to the current one.
    //We want to try to limit the number of API calls if possible.
    const oldTicketData = useRef();

    const [changesMade, setChangesMade] = useState(false)


    const [ticketInfo, setTicketInfo] = useState({
        // ticketNumber: null,
        // subject: null,
        // description: null,
        // resolution: null,
        // priority: null,
        // dateCreated: null,
        // dateClosed: null,
        // lastModified: null,
        // ticketNotes: null,
        // responses: null,
        // status: null,
        // assignedTo: null

    })

    const [assignedTo, setAssignedTo] = useState(null)

    useEffect(() => {
        if (openTicketState !== null) {
            getTicket();
        }
        
    }, [])


    useEffect(() => {
        if (JSON.stringify(oldTicketData.current) !==  JSON.stringify(ticketInfo)) {

            setChangesMade(true);
        }else{
            setChangesMade(false);
        }  

    }, [ticketInfo])


    const getTicket = async () => {

        try {

            const response = await getTicketById(openTicketState);
    
            oldTicketData.current = response.data;
    
            setTicketInfo({
                ...response.data
            })

            const assignedUserInfo = await getUserById(response.data.userId);
            setAssignedTo(assignedUserInfo.data)

            
            
        } catch (error) {
            
        }


    }

    const onChange = (e) => {
        setTicketInfo({
            ...ticketInfo,
            [e.target.name]: e.target.value
        });
    }

    const closingTicket = async () => {

        if(window.confirm("Do you want to close the case?")){
            try {
                const response = await closeTicket(ticketInfo.id);
                setTicketInfo({
                    ...ticketInfo,
                    dateClosed: response.data
                });
                oldTicketData.current.dateClosed = response.data;
                
                
            } catch (error) {
                alert(error);
            }


        }else{

        }

    }

    const save = async() => {
        try {
            await editTicket(ticketInfo.id, ticketInfo);
            setChangesMade(false);

            
        } catch (error) {
            
        }
    }

    return (
            <Modal
            className="modal"
            overlayClassName ="modal_overlay"   
            isOpen={ticketIsOpen} 
            shouldCloseOnOverlayClick={false}
            onRequestClose={closeTicketModal}>

                <div className="overall_ticket_info_container">

                    {/* Error Messages */}
                    <div></div>    
        
                    {/* Buttons */}
                    <div className="ticket_info_buttons">
                        {changesMade && <button onClick={save}>Save</button>}
                        <button onClick={closingTicket}>Close Case</button>
                        <button onClick={closeTicketModal}>Exit</button>
                    </div>
                    


                    <div className="ticket_info_container">

                        {/* Section for the inputs */}

                        <div className="ticket_info_section_container">
                            <div className="ticket_info_side_one">
                                <div className="ticket_info_input_container">
                                    <label htmlFor="ticketNumber">Ticket Number: {ticketInfo.ticketNumber}</label>
                                </div>

                                

                                <div className="ticket_info_input_container">
                                    <label htmlFor="assignedTo">Assigned To:</label>
                                    <input name="assignedTo" readOnly value={assignedTo?.firstName +" (" + assignedTo?.email+")" || ''}
                                    onChange={null}></input>
                                </div>



                                {/* Subject */}
                                <div className="ticket_info_input_container">
                                <label htmlFor="subject">Subject:</label>
                                </div>
                            
                                <input type="text" name="subject" value={ticketInfo.subject || ''} onChange={onChange}></input>
                                

                            </div>

                            <div className="ticket_info_side_two">

                                <div className="ticket_info_input_container">
                                    <label htmlFor="status">Status:</label>
                                    <select name="status" onChange={onChange}>
                                            <option value={ticketInfo.status} disabled>{ticketInfo.status}</option>
                                            {statusList.statusListArray.map((status, index) => 
                                            <option
                                                key = {"status_list_option" + index}
                                                value={status}

                                            >{status} </option>)
                                            }
                                    </select>
                                </div>

                                <div className="ticket_info_input_container">
                                    <label htmlFor="priority">Priority:</label>
                                    <select name="priority" onChange={onChange}>
                                            <option value="" disabled>{ticketInfo.priority}</option>
                                            {priorityList.map((priority, index) => 
                                            <option
                                                key = {"priority_list_option" + index}
                                                value={priority}

                                            >{priority} </option>)
                                            }
                                    </select>
                                </div>

                                <div className="ticket_info_input_container">
                                        <label htmlFor="dateCreated">Date Created: {ticketInfo.dateCreated}</label>
                                </div>

                                <div className="ticket_info_input_container">
                                        <label htmlFor="dateClosed">Date Closed: {ticketInfo.dateClosed}</label>
                                </div>                            


                            </div >


                        </div>


                        {/* Section for the description and resolution */}

                        <div className="ticket_info_section_container">



                                <div className="ticket_info_side_one">
                    

                        
                            

                                    {/* Description */}
                                    <label htmlFor="description">Description:</label>
                                    <textarea name="description" rows="3" cols="40" value={ticketInfo.description} 
                                    onChange={onChange}
                                    ></textarea>





                                </div>


                                <div className="ticket_info_side_two">



                                    {/* Resolution */}
                                    <label htmlFor="resolution">Resolution:</label>
                                    <textarea name="resolution" rows="3" cols="40" value={ticketInfo.resolution} 
                                    onChange={onChange}
                                    ></textarea>


                                    
                                </div>
                        </div>




                    </div>

                </div>    

            </Modal>      
      
    )
}

export default TicketInfo
