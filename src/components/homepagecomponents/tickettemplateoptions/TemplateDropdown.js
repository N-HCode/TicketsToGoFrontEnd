import React, { useContext } from 'react';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';

const TemplateDropdown = ({selectedIndex, onTemplateChange}) => {

    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const [ticketColumnsContext] = useContext(TicketColumnsContext);

    
    return (
        <select className="template_dropdown"
        value={ticketColumnsContext[primaryNavSelectedContext.array[selectedIndex].state.selectedTemplate].templateName}
        name="selectedTemplate" 
        onChange={(e) => onTemplateChange(e)}>
            {ticketColumnsContext.map((template, index) =>  
                <option key={"template_option_" +index} 
                        value={template.templateName}
                >{template.templateName}</option>

            )}
        </select>
    )


}

export default TemplateDropdown;