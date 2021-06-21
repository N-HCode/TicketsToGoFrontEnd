import React, { useContext, useState } from 'react';

//Services
import { loginAPI } from '../../services/UserService';
import { getAllStatus } from '../../services/StatusListService';
import { getAllPriorities} from '../../services/PriorityListService';
import { getAllTemplates } from '../../services/TicketColumnTempleService';
import { getTheUser } from '../../services/UserService';

//Contexts
import { UserContext } from '../context/UserContext';
import {NavLink} from 'react-router-dom';
import { OrganizationContext } from '../context/OrganizationContext';
import { TicketContext } from '../context/TicketContext';
import { StatusListContext} from '../context/StatusListContext';
import { PriorityListContext } from '../context/PriorityListContext';
import { TicketColumnsContext } from '../context/TicketColumnsContext';

//Others
import { ERROR, ERRORACTIONS} from '../constants/Error';
import ErrorComponent from '../constants/ErrorComponent';
import {Auth} from "../../routing/Auth"
import { useHistory } from "react-router-dom";

//"set HTTPS=true&&react-scripts start"


const LoginPage = (props) => {
    // Load User Context
    const [ user, setUser] = useContext(UserContext);
    const [ organization, setOrganization ] = useContext(OrganizationContext);
    const [ tickets, setTickets ] = useContext(TicketContext);
    const [ statusList, setStatusList ] = useContext(StatusListContext);
    const [ priorityList, setPriorityList] = useContext(PriorityListContext);
    const [ticketColumnsContext, setTicketColumnsContext] = useContext(TicketColumnsContext);

    const history = useHistory();



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


            await loginAPI(userLogin.username, userLogin.password);
            //the code below will only excute when there is an successful response.
            //otherwise it will be in the catch.
            

            setUserLogin({
                username: "",
                password: ""
            });

            const statusRequst =  await getAllStatus();

            setStatusList({
                ...statusList,
                statusListArray: statusRequst.data
            })

            const priorityRequest = await getAllPriorities();

            setPriorityList(priorityRequest.data)

            const userInfoRequest = await getTheUser();
            
            Auth.login(userInfoRequest.data);


            const ticketColumnResponse = await getAllTemplates();

            if (ticketColumnResponse.data.length > 0) {

                const ticketColumnArray = [];
                
                ticketColumnResponse.data.forEach(element => {


                    const columnNameStates = [];


                    element.columnNames.forEach(name => {

                        columnNameStates.push({
                            title: name
                            ,isEdit: false
                        })

                    })


                    ticketColumnArray.push({
                        id: element.id,
                        templateName:element.templateName,
                        columnStates: columnNameStates
                    })
                });

                setTicketColumnsContext(ticketColumnArray);

            }

            history.push("/");




      
        } catch (e) {
            //the error is an object that will contain the response when you catch it

            console.log(e);
            
            // switch (e.response.status) {

            //     case 403:

            //         return setErrorState(
            //             {
            //                 actionType: ERRORACTIONS.errorIsOn,
            //                 errorMessage: ERROR.loginIncorrect
            //             }
            //         )
            
            //     default:
            //         return setErrorState(
            //             {
            //                 actionType: ERRORACTIONS.errorIsOn,
            //                 errorMessage: ERROR.connectionIssue
            //             }
            //         )

            // }
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
