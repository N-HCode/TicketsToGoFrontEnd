import React, { useContext } from 'react'
import User from './User'
import { OrganizationContext } from "../context/OrganizationContext"

const UserList = () => {
    const [ organization ] = useContext(OrganizationContext);
    const userList = organization.users;
    const button = () => {
        console.log(userList)
    }
    return (
        <div>
            <button onClick={button}>check</button>
            { userList && userList.length > 0 && userList.map( user => <User user={user} /> )}
        </div>
    )
}

export default UserList
