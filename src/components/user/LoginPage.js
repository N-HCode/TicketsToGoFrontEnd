import React, { useContext, useReducer } from 'react';
import { loginUser } from '../../services/UserService';
import { UserContext } from '../context/UserContext';
import {NavLink} from 'react-router-dom';
import { OrganizationContext } from '../context/OrganizationContext';
import { TicketContext } from '../context/TicketContext';

const reducer = (state, action) =>{
    switch (action.type){
        case "error":
            return{
                ...state,
                error: true,
                errorMessage: action.errorMessage
            }
        case "clearErrors":
            return {
                ...state,
                error: false,
                errorMessage: null
            }    
        default:
            return state;
    }
}


const LoginPage = (props) => {
    // Load User Context
    const [ user, setUser] = useContext(UserContext);
    const [ organization, setOrganization ] = useContext(OrganizationContext);
    const [ tickets, setTickets ] = useContext(TicketContext);

    const [state, dispatch] = useReducer(reducer, {
        error: false,
        errorMessage: null

    })


    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        dispatch( {
            type: "clearErrors",
        })


        try {

            const response = await loginUser(user.username, user.password);

            const { tickets, ...rest} = response.data.user;

            setUser( 
                rest,
            )
            setOrganization(
                response.data.organization
            )
            setTickets(
                response.data.user.tickets
            )


            props.history.push("/")
            
        } catch (error) {
            dispatch( {
                type: "error",
                errorMessage: "Invalid Username or Password"

            })
        }
        

    }

    const changeToSignUpPage = () => {

    }

    return (
            <form onSubmit={onSubmit}>
                <div className="login_signup_form_container">
                    <div className="input_and_button_container">

                        <div className="input_container">
                        {/* Header */}
                        <h1>Login</h1>
                        <hr></hr>

                            {state.error? 
                            
                            <div className="error_message"><p>{state.errorMessage}</p></div>
                            
                            : <div></div>}

                            <label htmlFor="username">Username:</label>
                            <input  type="text" required name="username" value={user.username || ""} onChange={onChange}></input>
                            {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}

                            <label htmlFor="password">Password:</label> 
                            <input  type="password" required name="password" value={user.password || ""} onChange={onChange}></input>
                            {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}


                            <p>Don't have a login? Sign up <NavLink to="/createOrganization" onClick={changeToSignUpPage}>here</NavLink></p>
                            
                        </div>
                        <div className="login_signup_button_container">
                            {/* <button className="button_left_corner" type="submit">Sign up</button> */}
                            <button className="button_right_corner" >Login</button>
                        
                        </div>


                    </div>
                </div>
            </form>
    )
}

export default LoginPage
