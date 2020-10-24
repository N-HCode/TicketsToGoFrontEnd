import React, { useContext } from 'react'
import { loginUser } from '../../services/UserService'
import { UserContext } from '../context/UserContext'

const LoginPage = (props) => {

    const [user, setUser] = useContext(UserContext);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        await loginUser(user.username, user.password)
            .then(response => setUser(response.data))
            .then(props.history.push("/"))
    }

    return (
            <form onSubmit={onSubmit}>
                <div className="form-container">
                    <h1>Login</h1>
                    <hr></hr>

                    <label htmlFor="username">Username:</label>
                    <input  type="text" required name="username" value={user.username} onChange={onChange}></input>

                    <label htmlFor="password">Password:</label>
                    <input  type="password" required name="password" value={user.password} onChange={onChange}></input>

                    <button>Login</button>
                </div>
             
            </form>
    )
}

export default LoginPage
