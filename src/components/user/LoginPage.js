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
          
    }

    const buttonForTest = () => {
        console.log(user)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input  type="text" required name="username" value={user.username} onChange={onChange}></input>

                <label htmlFor="password">Password:</label>
                <input  type="password" required name="password" value={user.password} onChange={onChange}></input>

                <button>Login</button>
            </form>

            <button onClick={buttonForTest}>state</button>
        </div>
    )
}

export default LoginPage
