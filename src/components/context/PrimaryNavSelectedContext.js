import React, { useState, createContext } from 'react';

const PrimaryNavSelectedContext = createContext();

const PrimaryNavSelectedProvider = (props) => {
    const [ PrimaryNavSelected, setPrimaryNavSelected] = useState(
        {
            index: -1,
            array: []
        }


    );

    return (
        <div>
            <PrimaryNavSelectedContext.Provider
                value={[ PrimaryNavSelected, setPrimaryNavSelected]}
            >

                {props.children}
            </PrimaryNavSelectedContext.Provider>          
        </div>
    )
}

export {PrimaryNavSelectedContext, PrimaryNavSelectedProvider}







