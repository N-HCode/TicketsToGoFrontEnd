import React, {useState, useContext, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import {TICKETERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';
import { OpenTicketContext} from '../../context/OpenTicketContext';
import {getTicketById, closeTicket} from '../../../services/TicketService'

Modal.setAppElement('#root');



const TicketInfo = ({ticketIsOpen, closeTicketModal}) => {

    const [openTicketState] = useContext(OpenTicketContext);

    // ticketNumber: 1,
    // subject: null,
    // description: null,
    //resolution: null,
    // priority: null,
    // dateCreated: null,
    // dateClosed: null,
    // lastModified: null,
    // ticketNotes: null,
    // responses: null,
    // status: null,
    // assignedTo: null

    const oldTicketData = useRef();

    const [changesMade, setChangesMade] = useState(false)


    const [ticketInfo, setTicketInfo] = useState({
        ticketNumber: null,
        subject: null,
        description: null,
        resolution: null,
        priority: null,
        dateCreated: null,
        dateClosed: null,
        lastModified: null,
        ticketNotes: null,
        responses: null,
        status: null,
        assignedTo: null

    })

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

        const response = await getTicketById(openTicketState);
        oldTicketData.current = response.data;

        setTicketInfo({
            ...response.data
        })
        
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
                const response = await closeTicket(ticketInfo.ticketNumber);
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
                        {changesMade && <button>Save</button>}
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
                                    <input name="assignedTo" value={ticketInfo.assignedTo} onChange={onChange}/>
                                </div>



                                {/* Subject */}
                                <div className="ticket_info_input_container">
                                <label htmlFor="subject">Subject:</label>
                                </div>
                            
                                <input type="text" name="subject" value={ticketInfo.subject} onChange={onChange}></input>
                                

                            </div>

                            <div className="ticket_info_side_two">

                                <div className="ticket_info_input_container">
                                    <label htmlFor="subject">Status:</label>
                                    <select name="status">
                                            <option value="" disabled selected>{ticketInfo.status}</option>
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                    </select>
                                </div>

                                <div className="ticket_info_input_container">
                                    <label htmlFor="subject">Priority:</label>
                                    <select name="status">
                                            <option value="" disabled selected>{ticketInfo.priority}</option>
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
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
