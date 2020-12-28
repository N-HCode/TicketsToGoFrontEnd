import React, { useState, createContext } from 'react';

const StatusListContext = createContext();

const StatusListProvider = (props) => {
    const [ statusList, setStatusList ] = useState({
        currentStatus: null,
        statusListArray: []
    });

    return (
        <StatusListContext.Provider
            value={ [statusList, setStatusList] }
        > 
           {props.children}
       </StatusListContext.Provider>
    )
}

export { StatusListContext, StatusListProvider };
