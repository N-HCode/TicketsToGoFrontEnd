import React, { useState, createContext } from 'react'

const UserContext = createContext();

const UserProvider = (props) => {
    const [ user, setUser ] = useState({
        details:{},
        organization:{},
        tickets:{}
    })

    return (
        <UserContext.Provider
            value={ [user, setUser] }
        > 
           {props.children}
       </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
