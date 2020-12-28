import React, { useState, createContext } from 'react';

const PriorityListContext = createContext();

const PriorityListProvider = (props) => {
    const [ priorityList, setPriorityList ] = useState([]);


    return (
        <PriorityListContext.Provider
            value={ [priorityList, setPriorityList] }
        > 
           {props.children}
       </PriorityListContext.Provider>
    )
}

export { PriorityListContext, PriorityListProvider };
