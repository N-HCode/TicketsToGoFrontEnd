import React, { useContext } from 'react'
import User from './User'
import { UserContext } from "../context/UserContext"

const UserList = () => {
    const [ user ] = useContext(UserContext);
    const userList = user.organization.users;
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
