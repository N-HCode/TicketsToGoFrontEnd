import React, { useState, createContext } from 'react';

const OrganizationContext = createContext();

const OrganizationProvider = (props) => {
    const [ organization, setOrganization ] = useState({
    });

    return (
        <OrganizationContext.Provider
            value={ [organization, setOrganization] }
        > 
           {props.children}
       </OrganizationContext.Provider>
    )
}

export { OrganizationContext, OrganizationProvider };
