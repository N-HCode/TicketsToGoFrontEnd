import React, {useReducer, useState} from  'react';
import Modal from 'react-modal';
import {ERROR, ERRORACTIONS} from '../../constants/Error';
import ErrorComponent from '../../constants/ErrorComponent';
import { createUser } from '../../../services/UserService';

const reducer = (state, action) => {
    switch(action.type){
        case "onChange":
            return{
                ...state,
                [action.event.name]: action.event.value
            }
        case "clear":
            return {
                username: null,
                password: null,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                userRole: null
            }
        case "setUser":
            return action.user
  
        default:
            return state;
    }
}

const AdminAddUser = ({IsOpen, cancelAddUser, confirmPassword, updateToCurrentUsers, currentPage}) => {

    const [state, dispatch] = useReducer(reducer,{ 
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        userRole: null
    });


    const [errorState, setErrorState] = useState(
        {
            actionType: "",
            errorMessage: ""
        }
    )

    const onChange = (e) => {
        dispatch({type: "onChange", event: e.target})
    }

    const addUser = async (e) => {
        e.preventDefault();

        if (state.password !== confirmPassword.current.value) {
            return setErrorState(
                {
                    actionType: ERRORACTIONS.errorIsOn,
                    errorMessage: ERROR.confirmPWIncorrect
                }
            )

        }else{
            
            try {
                const response = await createUser(state);
                console.log(response);
                updateToCurrentUsers(currentPage);
    
            } catch (error) {
                alert(error);
                return;
            }
    
            
            confirmPassword.current.value = null;
            dispatch({ type: "clear"});
            setErrorState(
                {
                    actionType: ERRORACTIONS.clearErrors,
                }
            )
            cancelAddUser();
        }


    }

    const close = () =>{
        setErrorState(
            {
                actionType: ERRORACTIONS.clearErrors,
            }
        )
        cancelAddUser()

    }


    return (
        <Modal 
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={IsOpen} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={cancelAddUser}>


            <form onSubmit={addUser}>
                <h2>Add User</h2>
                <p className="sub_title_text">Add in details to create a new user</p>
                <hr></hr>

                <ErrorComponent errorState={errorState}/>

                <div className="modal_form_inputs">

                    {/* <button type="button" onClick={check}>check</button> */}
                    <div className="modal_column">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" required onChange={onChange}></input>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" required onChange={onChange}></input>

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required onChange={onChange}></input>

                        <label htmlFor="phoneNumber">PhoneNumber (Opt)</label>
                        <input type="text" name="phoneNumber" 
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        onChange={onChange}></input>
                    </div>

                    <div className="modal_column">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required onChange={onChange}></input>

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required onChange={onChange}></input>

                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="password" required ref={confirmPassword}></input>


                        {/* if option value is "" it will cause a validation error if the 
                        required tagged is there. */}
                        <label htmlFor="userRole">User Role:</label>
                        {/* the defaultValue has to match the value of the option. if the value is "" then it will prompt the user to
                        select from the list */}
                        <select name="userRole" defaultValue="" onChange={onChange} required>
                            <option value="" disabled hidden >Select Role...</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                </div>    

                <div className="modal_btn">
                    {/* this creates a reset button that will rest all the values
                    in the form */}
                    {/* <input type="reset" value="reset"/> */}

                    <button type="button" onClick={close}>Cancel</button>
                    <button>Add User</button>
                </div>    
            </form>

        </Modal>
    )
}

export default AdminAddUser
