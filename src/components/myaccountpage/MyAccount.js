import React, {useRef, useState, useContext, useReducer} from 'react';
import { UserContext } from '../context/UserContext';
import { OrganizationContext} from '../context/OrganizationContext';
import { editUser, checkPassword } from '../../services/UserService';
import {ERROR} from '../constants/Error';

const reducer = (state, action) =>{
    switch (action.type){
        case "password":
            return {
                ...state,
                changePassword: !state.changePassword
            }
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

const MyAccount = () => {

    const [user] = useContext(UserContext);
    const [organization] = useContext(OrganizationContext);
    const [state, dispatch] = useReducer(reducer, {
        changePassword: false,
        error: false,
        errorMessage: null

    }) 

    const [shake, setShake] = useState(false);

    const navbar = useRef();
    const currentActiveNav = useRef(0);


    const oldPassword = useRef(user.password);
    const oldPasswordInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();


    const onSubmitPassword = async (e) => {
        e.preventDefault();

        //Looks like a console log is created when there is a failed fetch request and this is browser dependent
        try {
            await checkPassword(user.userId, oldPasswordInput.current.value);
        } catch (error) {
            // alert(error);
            setShake(true);
            dispatch({type:"error",
            errorMessage: ERROR.currentPW})
            return;
        }
        
        if(passwordInput.current.value === oldPassword.current) {
            setShake(true);
            dispatch({type:"error",
                errorMessage: ERROR.samePW})
        }else if(passwordInput.current.value !== confirmPasswordInput.current.value){
            setShake(true);
            dispatch({type:"error",
                errorMessage: ERROR.confirmPW})
        }else{
     
            const userCopy = {
                ...user,
                password: passwordInput.current.value
            }

            saveNewPassword(userCopy);

        }
    }

    const saveNewPassword = async (userCopy) => {

        //await is just promises with syntax sugar.
        try {
            await editUser(userCopy.userId, userCopy);
            //the items below the await will run AFTER the await is done.
            alert("Password saved");
            
        } catch (error) {
            // alert(error);
        }
        
    }

    const onClickPassword = () => {
        dispatch({type: "clearErrors"});
        dispatch({type: "password"})
        
    }

    //Will be used to change passwords
    return (
        <div className="main_container">
            <div id="my_account_page_container">


                <div className="single_page_container">

                    <div className="my_account_single_page">

                     <div className="info_container">
                         <div id="info_tag">
                            <p>Organization:</p>
                            <p>Account Number: </p>
                            <p>Username:</p>
                            <p>Email:</p>
                         </div>
                         <div id="info_details">
                            <p>{organization.organizationName}</p>
                            <p>{organization.accountNumber}</p>
                            <p>{user.username}</p>
                            <p>{user.email} </p>
                         </div>

                    </div>       



                    <button onClick={onClickPassword}>Change Password</button>
                    {!state.changePassword? 
                            <div></div>
                        :



                        <form id="change_password_form" onSubmit={onSubmitPassword}>

                            <div>

                            {state.error && 
                                <div className={shake?"error_message shake": "error_message"}
                                    onAnimationEnd={() => setShake(false)}
                                ><p>{state.errorMessage}</p></div>

                            }

                            </div>

                            {/* password */}
                            
                            <label htmlFor="password" >Current Password:</label>
                            <input type="password" 
                            name="password"
                            ref={oldPasswordInput}
                            required />

                            {/* new password */}

                            <label htmlFor="newPassword" >New Password:</label>
                            <input type="password" 
                            name="password"
                            ref={passwordInput}
                            required />

                            {/* confirm new password */}

                            <label htmlFor="confirmNewPassword" >Confirm New Password:</label>
                            <input type="password" 
                            name="password"
                            ref={confirmPasswordInput}
                            required />

                            <button>Submit</button>
                         </form>
                
                    }




                    </div>


                </div>

            </div>
        </div>
    )
}

export default MyAccount
