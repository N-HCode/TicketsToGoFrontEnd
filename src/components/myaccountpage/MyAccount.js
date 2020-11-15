import React, {useRef, useContext, useReducer} from 'react'
import { UserContext } from '../context/UserContext'

const reducer = (state, action) =>{
    switch (action.type){
        case "password":
            return {
                ...state,
                changePassword: !state.changePassword
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
        errorMessage: "none"

    })  


    const navbar = useRef();
    const oldPassword = useRef(user.password);
    const passwordInput = useRef();

    const onSubmitPassword = () => {

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
                        <li><i className="material-icons">lock</i>Security</li>
                        <li className="active_tab">Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
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
                                <p>error message</p>

                            : 
                                <div></div>    

                            }

                            </div>

                            {/* password */}
                            
                            <label htmlFor="password" >Old Password</label>
                            <input type="password" 
                            name="password"
                            ref={passwordInput}
                            required />

                            {/* new password */}

                            <label htmlFor="newPassword" >New Password</label>
                            <input type="password" 
                            name="password"
                            required />

                            {/* confirm new password */}

                            <label htmlFor="confirmNewPassword" >Confirm New Password</label>
                            <input type="password" 
                            name="password"
                            required />

                         </form>
                
                    }




                    </div>


                </div>

            </div>
        </div>
    )
}

export default MyAccount
