import React, { useContext , useEffect } from 'react'
import { loginUser } from '../../services/UserService'
import { UserContext } from '../context/UserContext'
import { findByUserId } from '../../services/OrganizationService'
import { OrganizationContext } from "../context/OrganizationContext"

const LoginPage = (props) => {

    const [ user, setUser] = useContext(UserContext);
    const [ organization, setOrganization ] = useContext(OrganizationContext);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        await loginUser(user.username, user.password)
            .then( response => setUser(response.data))
            .catch(alert);

        // await findByUserId(user.userId)
        //     .then( response => setOrganization(response.data) )
        //     .then( props.history.push("/"))
    }

    useEffect(() => {
        let isMounted = true;
        window.addEventListener('user', user)

        if(user.userId && isMounted)
        findByUserId(user.userId)
            .then( response => setOrganization(response.data) )
            .then( props.history.push("/"))
            .catch(alert);

        return () => {
            isMounted = false;
            window.removeEventListener('user', user)
        }    
    })

    return (
            <form onSubmit={onSubmit}>
                <div className="form-container">
                    <h1>Login</h1>
                    <hr></hr>

                    <label htmlFor="username">Username:</label>
                    <input  type="text" required name="username" value={user.username || ""} onChange={onChange}></input>
                    {/* uncontrolled state so the value needs to have an initial state  empty string*/}
                    <label htmlFor="password">Password:</label> 
                    <input  type="password" required name="password" value={user.password || ""} onChange={onChange}></input>

                    <button>Login</button>
                </div>
             
            </form>
    )
}

export default LoginPage
