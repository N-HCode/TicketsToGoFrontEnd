import React, {useState} from 'react';
import Modal from 'react-modal';
import {TICKETERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';

const TicketModal = () => {

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

    return (
        <div>
            <Modal>
                <div>
                    <div>
                        {/* Object.keys gives an array of the properties
                            We then map through that array
                        */}
                        {Object.keys(ticketInfo).map((prop,index) => 
                            <p>{ticketInfo[prop]}</p>
                        
                        )}
                    </div>
                    <div>
                        
                    </div>

                </div>
                <div>

                </div>


            </Modal>      
        </div>
    )
}

export default TicketModal
