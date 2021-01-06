import React, { useState, createContext } from 'react';

const PrimaryNavSelectedContext = createContext();

const PrimaryNavSelectedProvider = (props) => {
    const [ PrimaryNavSelected, setPrimaryNavSelected] = useState(
        {
            index: -1,
            array: [
                // type: COMPONENTTYPENUMBER.TicketTemplateContainer,
                // state: {
                //     selectedTemplate: "",
                //     columns: []
                // }
            ]
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







