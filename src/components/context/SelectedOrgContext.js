import React, { useState, createContext } from 'react';

const SelectedOrgContext = createContext();

const SelectedOrgProvider = (props) => {
    const [ selectedOrg, setSelectedOrg] = useState(null);


    return (
        <SelectedOrgContext.Provider
            value={ [selectedOrg, setSelectedOrg] }
        > 
           {props.children}
       </SelectedOrgContext.Provider>
    )
}

export { SelectedOrgContext, SelectedOrgProvider };
