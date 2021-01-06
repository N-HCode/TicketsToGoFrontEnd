import React, { useState, useEffect } from 'react';

const TemplateDropdown = ({state, onTemplateChange}) => {

  

    
    return (
        <select className="template_dropdown"
        value={state.selectedTemplate}
        name="selectedTemplate" 
        onChange={(e) => onTemplateChange(e)}>
            <option value="">New</option>
            <option value="new_template">New Template</option>
            <option value="medium">Test1</option>
            <option value="high">Test2</option>
            <option value="escalate">Test3</option>
        </select>
    )


}

export default TemplateDropdown;