import React, { useContext } from 'react';
import { loginUser } from '../../services/UserService';
import { UserContext } from '../context/UserContext';

const LoginPage = (props) => {
    // Load User Context
    const [ user, setUser] = useContext(UserContext);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        await loginUser(user.username, user.password)
            .then( response => {
                // ommiting tickets from reponse in the user object for the details key in Context
                const { tickets, ...rest} = response.data.user;

                setUser( 
                    {
                        details: rest,
                        organization : response.data.organization,
                        tickets: response.data.user.tickets
                    }
                )
            })
            .then(props.history.push("/"))
            .catch(alert)
    }

    return (
            <form onSubmit={onSubmit}>
                <div className="form-container">
                    {/* Header */}
                    <h1>Login</h1>
                    <hr></hr>

                    <label htmlFor="username">Username:</label>
                    <input  type="text" required name="username" value={user.username || ""} onChange={onChange}></input>
                    {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}

                    <label htmlFor="password">Password:</label> 
                    <input  type="password" required name="password" value={user.password || ""} onChange={onChange}></input>
                    {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}

                    <button type="submit">Login</button>
                </div>
            </form>
    )
}

export default LoginPage
