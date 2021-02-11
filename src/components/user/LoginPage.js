import React, { useContext, useState } from 'react';

//Services
import { loginUser } from '../../services/UserService';
import { getAllStatus } from '../../services/StatusListService';
import { getAllPriorities} from '../../services/PriorityListService';

//Contexts
import { UserContext } from '../context/UserContext';
import {NavLink} from 'react-router-dom';
import { OrganizationContext } from '../context/OrganizationContext';
import { TicketContext } from '../context/TicketContext';
import { StatusListContext} from '../context/StatusListContext';
import { PriorityListContext } from '../context/PriorityListContext';

//Others
import { ERROR, ERRORACTIONS} from '../constants/Error';
import ErrorComponent from '../constants/ErrorComponent';
import Auth from '../../routing/Auth';

//"set HTTPS=true&&react-scripts start"


const LoginPage = (props) => {
    // Load User Context
    const [ user, setUser] = useContext(UserContext);
    const [ organization, setOrganization ] = useContext(OrganizationContext);
    const [ tickets, setTickets ] = useContext(TicketContext);
    const [ statusList, setStatusList ] = useContext(StatusListContext);
    const [ priorityList, setPriorityList] = useContext(PriorityListContext);



    const [ userLogin, setUserLogin] = useState({
        username: "",
        password: ""

    })

    const [errorState, setErrorState] = useState(
        {
            actionType: "",
            errorMessage: ""
        }
    )

    const onChange = (e) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
       
        try {

            const response = await loginUser(userLogin.username, userLogin.password);

            setUserLogin({
                username: "",
                password: ""
            })

            Auth.login();

            try {

                const statusListResponse = await getAllStatus(response.data.organization.statusListId)

                setStatusList({
                    ...statusList,
                    statusListArray:statusListResponse.data});

                const priorityListReponse = await getAllPriorities(response.data.organization.priorityListId);
                setPriorityList(priorityListReponse.data);
                
            } catch (error) {

                return setErrorState(
                    {
                        actionType: ERRORACTIONS.errorIsOn,
                        errorMessage: ERROR.connectionIssue
                    }
                )
                
            }

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





 
            setErrorState(
                {
                    actionType: ERRORACTIONS.clearErrors,
                }
            )
            props.history.push("/")
            
        } catch (e) {
            //error will have the response property so you can get the status code from that.
            // console.log(error.response.status);
            
            return setErrorState(
                {
                    actionType: ERRORACTIONS.errorIsOn,
                    errorMessage: ERROR.loginIncorrect
                }
            )

        }
        

    }


    return (
            <form onSubmit={onSubmit}>
                <div className="login_signup_form_container">
                    <div className="input_and_button_container">

                        <div className="input_container">
                        {/* Header */}
                        <h1>Login</h1>
                        <hr></hr>

                        <ErrorComponent errorState={errorState}/>

                            <label htmlFor="username">Username:</label>
                            <input  type="text" required name="username" value={userLogin.username || ""} onChange={onChange}></input>
                            {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}

                            <label htmlFor="password">Password:</label> 
                            <input  type="password" required name="password" value={userLogin.password || ""} onChange={onChange}></input>
                            {/* uncontrolled state in Context so value needs to have an initial value or empty string*/}


                            <p>Don't have a login? Sign up <NavLink to="/createOrganization">here</NavLink></p>
                            
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
