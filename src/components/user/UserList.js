import React, { useContext } from 'react'
import User from './User'
import { OrganizationContext } from "../context/OrganizationContext"

const UserList = () => {
    const [ organization ] = useContext(OrganizationContext);

    const button = () => {
        console.log(organization)
    }
    return (
        <div>
            <button onClick={button}>check</button>
            { organization && organization.users.length > 0 && organization.users.map( user => <User user={user} /> )}
        </div>
    )
}

export default UserList
