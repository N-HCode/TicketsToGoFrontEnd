import React, {useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import {TICKETERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';
import { OpenTicketContext} from '../../context/OpenTicketContext';

Modal.setAppElement('#root');



const TicketInfo = ({ticketIsOpen, closeTicketModal}) => {

    const [openTicketState] = useContext(OpenTicketContext);

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

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

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

                <div>
                    <div className="ticket_info_container">
                        {/* Object.keys gives an array of the properties
                            We then map through that array
                        */}
                        {Object.keys(ticketInfo).map((prop,index) => 
                            <p key={"ticket_info_prop_" + index}>{prop}</p>
                        
                        )}
                    </div>
                    <div>
                        {Object.keys(ticketInfo).map((prop,index) => 
                            <p key={"ticket_info" + index}>{ticketInfo[prop]}</p>
                        
                        )}
                        
                    </div>

                </div>
                <div>

                </div>


            </Modal>      
      
    )
}

export default TicketInfo
