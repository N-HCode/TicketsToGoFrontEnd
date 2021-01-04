import React from 'react';
import TemplateDropdown from '../tickettemplateoptions/TemplateDropdown';
import CurrentTemplateOptions from '../tickettemplateoptions/CurrentTemplateOptions';
import TicketTabList from '../tickettab/TicketTabList';
import TicketColumnList from '../ticketcolumns/TicketColumnList';
import TicketInfo from '../ticketinfo/TicketInfo';

const TicketTemplateContainer = ({ticketIsOpen, openTicketModal, closeTicketModal}) => {
    return (
            <div className="template_container">
                {/* template options selection */}
                <div className="template_options">
                   
                    
                    <TemplateDropdown/>
                    <CurrentTemplateOptions/>

                </div>

                {/* tab line */}
                <div className="tab_line"></div>

                {/* ticket tabs */}
                < TicketTabList openTicketModal={openTicketModal}/>

                {/* Ticket column container */}

                {/* <button onClick={openTicketModal}>Change</button> */}

                <TicketColumnList openTicketModal={openTicketModal}/>

                {ticketIsOpen && <TicketInfo ticketIsOpen={ticketIsOpen} closeTicketModal={closeTicketModal}/>}

                
            </div>
    )
}

export default TicketTemplateContainer
