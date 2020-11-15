import React, {useRef, useState, useContext, useReducer} from 'react';
import { UserContext } from '../context/UserContext';
import { editUser } from '../../services/UserService';

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
    const [state, dispatch] = useReducer(reducer, {
        changePassword: false,
        error: false,
        errorMessage: null

    }) 

    const [navState] = useState(["Security","hello", "hello"])


    const navbar = useRef();
    const currentActiveNav = useRef(0);

    const onNavClick = (index) => {
        navbar.current.children[currentActiveNav.current].classList.remove("active_tab");
        currentActiveNav.current = index;
        navbar.current.children[index].classList.add("active_tab");

    }

    const oldPassword = useRef(user.password);
    const oldPasswordInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();

    const ERROR = {
        currentPW: "Current password is incorrect",
        samePW: "New password cannot be the same as current password",
        confirmPW: "Confirm Password and New Password does not match"
    }

    const onSubmitPassword = (e) => {
        e.preventDefault();
        // if(oldPasswordInput.current.value !== oldPassword.current){
        //     dispatch({type:"error",
        //         errorMessage: ERROR.currentPW})
        // }
        // else 
        
        if(passwordInput.current.value === oldPassword.current) {
            dispatch({type:"error",
                errorMessage: ERROR.samePW})
        }else if(passwordInput.current.value !== confirmPasswordInput.current.value){
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
            alert(error);
        }
        
    }

    const onClickPassword = () => {
        dispatch({type: "password"})
    }

    //Will be used to change passwords
    return (
        <div className="main_container">
            <div id="my_account_page_container">

                <div id="my_account_nav_menu_container">
                    <ul className="my_account_nav_menu" ref={navbar}>
                        {navState.map((item,index) => 
                            <li 
                            className={index === 0 ? "active_tab": ""}
                            key={"my_account_nav_" + index}
                                onClick={() => onNavClick(index)}
                            >
                                <i className="material-icons">lock</i>{item}
                            
                            </li>

                        )}
                    </ul>

                </div>

                <div className="single_page_container">

                    <div className="my_account_single_page">

                    <p>Username: {user.username}</p>
                    <p>Email:{user.email} </p>




                    {!state.changePassword? 
                        <button onClick={onClickPassword}>change password</button>
                        :



                        <form id="change_password_form" onSubmit={onSubmitPassword}>

                            <div>

                            {state.error? 
                                <div className="error_message"><p>{state.errorMessage}</p></div>

                            : 
                                <div></div>    

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
