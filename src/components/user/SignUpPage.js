import React, { useState, useContext } from 'react'
import { signUp, addOrganizationToUser } from '../../services/UserService'
import { UserContext } from "../context/UserContext"

const SignUpPage = (props) => {

    const [ context ] = useContext(UserContext);

    const [user, setUser] = useState({
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:"",
        userRole:"standard",
        phoneNumber:""
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await signUp(user)
            .then( response => response.data.userId)
            .then( userId => addOrganizationToUser(userId, context.organization.id))
            .then(alert("success"))
            .then(props.history.push("/"))
            .catch(alert);
    }
    
    return (
        <form onSubmit={onSubmit}> 
            <div className="form-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr></hr>

                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={onChange}></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={onChange}></input>

                <label htmlFor="password-repeat">Repeat Password</label>
                <input type="password" name="repeatPassword" onChange={onChange}></input>

                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstName" onChange={onChange}></input>

                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastName" onChange={onChange}></input>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={onChange}></input>

                <label htmlFor="user-role">User Role</label>
                <select name="userRole" onChange={onChange}> 
                        <option value="standard">standard</option>
                        <option value="admin">admin</option>
                </select>

                <label htmlFor="phone-number">Phone Number</label>
                <input type="tel" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="333-333-3333" onChange={onChange}></input>

                <button type="submit">Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpPage
