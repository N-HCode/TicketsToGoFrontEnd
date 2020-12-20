import React, {useState, useContext, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import {TICKETERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';
import { OpenTicketContext} from '../../context/OpenTicketContext';
import {getTicketById} from '../../../services/TicketService'

Modal.setAppElement('#root');



const TicketInfo = ({ticketIsOpen, closeTicketModal}) => {

    const [openTicketState] = useContext(OpenTicketContext);

    // ticketNumber: 1,
    // subject: null,
    // description: null,
    // priority: null,
    // dateCreated: null,
    // dateClosed: null,
    // lastModified: null,
    // ticketNotes: null,
    // responses: null,
    // status: null,
    // assignedTo: null

    const oldTicketData = useRef();


    const [ticketInfo, setTicketInfo] = useState({
        ticketNumber: 1,
        subject: null,
        description: null,
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

    const getTicket = async () => {

        const response = await getTicketById(openTicketState);
        oldTicketData.current = {...response.data};

        setTicketInfo({
            ...response.data
        })
        
    }

    return (
            <Modal
            className="modal"
            overlayClassName ="modal_overlay"   
            isOpen={ticketIsOpen} 
            shouldCloseOnOverlayClick={false}
            onRequestClose={closeTicketModal}>

                {/* Error Messages */}
                <div></div>    
    
                {/* Buttons */}

                <div className="ticket_info_container">

                    {/* Section for the inputs */}

                    <div className="ticket_info_section_container">
                        <div className="ticket_info_side_one">
                            <div className="ticket_info_input_container">
                                <label htmlFor="ticketNumber">Ticket Number: {ticketInfo.ticketNumber}</label>
                            </div>

                            <div className="ticket_info_input_container">
                                <label htmlFor="TicketOwner">Ticket Owner:</label>
                                <input value={ticketInfo.assignedTo}/>
                            </div>



                            {/* Subject */}
                            <div className="ticket_info_input_container">
                            <label htmlFor="subject">Subject:</label>
                            </div>
                        
                            <input type="text" name="subject" ></input>
                            

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
                                    <label htmlFor="subject">Date Created: {ticketInfo.dateCreated}</label>
                            </div>

                            <div className="ticket_info_input_container">
                                    <label htmlFor="subject">Date Closed: {ticketInfo.dateClosed}</label>
                            </div>                            


                        </div >


                    </div>


                    {/* Section for the description and resolution */}

                    <div className="ticket_info_section_container">



                            <div className="ticket_info_side_one">
                

                    
                        

                                {/* Description */}
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" rows="3" cols="40" ></textarea>





                            </div>


                            <div className="ticket_info_side_two">



                                {/* Resolution */}
                                <label htmlFor="Resolution">Resolution:</label>
                                <textarea name="Resolution" rows="3" cols="40" ></textarea>


                                
                            </div>
                    </div>




                </div>
                <div>

                </div>


            </Modal>      
      
    )
}

export default TicketInfo
