import React from 'react'

const User = (props) => {
    return (
        <div>
          <label htmlFor="name">Name:</label>
          {props.user.firstName}

          <label htmlFor="role">UserRole:</label>
          <select name="userRole"> 
            <option value={props.user.userRole} >{props.user.userRole}</option>
            <option value="standard">standard</option>
            <option value="admin">admin</option>
          </select>

          <label htmlFor="email">Email:</label>
          {props.user.userRole}

          <label htmlFor="phone">PhoneNumber:</label>
          {props.user.userRole}
        </div>
    )
}

export default User
