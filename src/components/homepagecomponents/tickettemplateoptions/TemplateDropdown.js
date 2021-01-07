import React, { useState, useContext } from 'react';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';

const TemplateDropdown = ({selectedIndex, onTemplateChange}) => {

    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);

    
    return (
        <select className="template_dropdown"
        value={primaryNavSelectedContext.array[selectedIndex].state.selectedTemplate}
        name="selectedTemplate" 
        onChange={(e) => onTemplateChange(e)}>
            <option value="New Tab">New</option>
            <option value="new_template">New Template</option>
            <option value="medium">Test1</option>
            <option value="high">Test2</option>
            <option value="escalate">Test3</option>
        </select>
    )


}

export default TemplateDropdown;