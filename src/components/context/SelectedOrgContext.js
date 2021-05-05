import React, { useState, createContext } from 'react';

const SelectedOrgContext = createContext();

const SelectedOrgProvider = (props) => {
    const [ selectedOrg, setSelectedOrg] = useState();


    return (
        <PriorityListContext.Provider
            value={ [selectedOrg, setSelectedOrg] }
        > 
           {props.children}
       </PriorityListContext.Provider>
    )
}

export { SelectedOrgContext, SelectedOrgProvider };
