import React, { useState, useEffect } from 'react';

const TemplateDropdown = () => {

    

    
    return (
        <select className="template_dropdown">
            <option value="new_template">New Template</option>
            <option value="medium">Test1</option>
            <option value="high">Test2</option>
            <option value="escalate">Test3</option>
        </select>
    )


}

export default TemplateDropdown;