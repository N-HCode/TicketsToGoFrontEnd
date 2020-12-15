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



            </Modal>      
        </div>
    )
}

export default TicketModal
