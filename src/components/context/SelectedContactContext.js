import React, { useState, createContext } from 'react';

const SelectedContactContext = createContext();

const SelectedContactProvider = (props) => {
    const [ selectedContact, setSelectedContact] = useState(null);


    return (
        <SelectedContactContext.Provider
            value={ [selectedContact, setSelectedContact] }
        > 
           {props.children}
       </SelectedContactContext.Provider>
    )
}

export { SelectedContactContext, SelectedContactProvider };
