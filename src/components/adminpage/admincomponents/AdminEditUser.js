import React, { useState, useReducer, useRef, useEffect} from 'react';
import Modal from 'react-modal';
import { OrganizationContext} from '../../context/OrganizationContext';
import {editUser} from '../../../services/UserService';

const AdminEditUser = ({currentEditUser, editingUser, cancelEditUser, updateToCurrentUsers}) => {

    // username: null,
    // password: null,
    // firstName: null,
    // lastName: null,
    // email: null,
    // phoneNumber: null,
    // userRole: null
    const user = currentEditUser.current;
    const [userState, setUserState] = useState(currentEditUser.current);
    const [error, setError] = useState({
        exist: false,
        errorMessage: ""


    })
    const [changeInfo, setChangeInfo] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const close = () => {
        setUserState(null);
        cancelEditUser();
    }

   

    const changingInfo = () => {

        if(changeInfo){
            setUserState(currentEditUser.current);
            setChangesMade(false);
        }

        setChangeInfo(!changeInfo);
    }

    
    const oldUsername = useRef(userState.username);
    const oldFirstName = useRef(userState.firstName);
    const oldLastName = useRef(userState.lastName);
    const oldEmail = useRef(userState.email);
    const oldPhoneNumber = useRef(userState.phoneNumber);
    const oldRole = useRef(userState.userRole);
    const oldArray = [oldUsername.current, oldFirstName.current, 
        oldLastName.current, oldEmail.current, oldPhoneNumber.current,
        oldRole.current]

    const onChange = (e) => {

        console.log(e.target.name);
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });

    }

    useEffect(() => {
    
        //We use stringify to compare two objects
        //We put this in a useEffect, because we need this logic to happens
        //AFTER the state has been changed. setState is Async, so if we do not do this
        //it would compare old information instead of the new one
        if (JSON.stringify(currentEditUser.current) !==  JSON.stringify(userState)) {
            setChangesMade(true);
        }else{
            setChangesMade(false);
        }  
    }, [userState])

    const check = () => {
        console.log(oldArray);
    }

    const save = async (e) => {
        e.preventDefault();

        try {
            await editUser(user.userId, userState);
            updateToCurrentUsers();
            currentEditUser.current = userState;
            alert("Success")
            
        } catch (error) {
            alert(error)
        }
        
    }
    

    return (
        <Modal
            className="modal"
            overlayClassName ="modal_overlay"  
            isOpen={editingUser}
            shouldCloseOnOverlayClick={false}
            onRequestClose={close}
        >
            <div>
                <h2>Edit User</h2>
                <p className="sub_title_text">Change user info or make inactive</p>
                <hr></hr>
                
                <div className="edit_contents" style={{"display" : "flex"}}>

                    <div>
                        <p>Username :</p>            
                        <p>Password :</p>
                        <p>First Name :</p>
                        <p>Last Name :</p>
                        <p>Email :</p>
                        <p>Phone Number :</p>
                        <p>User Role :</p>
                        {/* <p>Date Created :</p>
                        <p>Last Login:</p>
                        <p>Last Modified :</p> */}
                    </div>

                    <div >
                       
                        {/* <p>{userState.username === null? <br/> : userState.username}</p> */}
                        {/* <ChangeToInput name="username" value={userState.username}/> */}

                        {changeInfo && userState.userRole.toLowerCase() !== "root"?
                        
                        <form id="edit_form" className="edit_inputs" onSubmit={save}>
                            <input type="text" name="username" required value={userState.username} onChange={ onChange}></input>
                            <p>{userState.password === null? <br/> : userState.password}</p>
                            <input type="text" name="firstName" required value={userState.firstName} onChange={ onChange}></input>
                            <input type="text" name="lastName" required value={userState.lastName} onChange={ onChange}></input>
                            <input type="text" name="email"  required value={userState.email} onChange={ onChange}></input>
                            <input type="text" name="phoneNumber" value={userState.phoneNumber} onChange={ onChange}></input>
                            {userState.userRole !== "root"?
                                <div>
                                    { changeInfo? 
                                        <div>                             
                                            <select name="userRole" onChange={onChange}>
                                            <option value="" disabled selected>{userState.userRole}</option>
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                            </select>
                                        </div>
                                        :
                                        <p>{userState.userRole}</p>
                                    }
                            </div>
                                :
                                <p>{userState.userRole === null? <br/> : userState.userRole}</p>
                            }
                            {/* <p>{userState.dateCreated === null? <br/> : userState.dateCreated}</p>
                            <p>{userState.lastLogin === null? <br/> : userState.lastLogin}</p>
                            <p>{userState.lastModified === null? <br/> : userState.lastModified}</p> */}
                       

                        </form>
                        :
                        <div className="edit_inputs">
                            <p>{userState.username === null? <br/> : userState.username}</p>
                            <p>{userState.password === null? <br/> : userState.password}</p>
                            <p>{userState.firstName === null? <br/> : userState.firstName}</p>
                            <p>{userState.lastName === null? <br/> : userState.lastName}</p>
                            <p>{userState.email === null? <br/> : userState.email}</p>
                            <p>{userState.phoneNumber === null? <br/> : userState.phoneNumber}</p>
                            <p>{userState.userRole === null? <br/> : userState.userRole}</p>
                            <p>{userState.dateCreated === null? <br/> : userState.dateCreated}</p>
                            <p>{userState.lastLogin === null? <br/> : userState.lastLogin}</p>
                            <p>{userState.lastModified === null? <br/> : userState.lastModified}</p>
                        </div>
                        }
                 
                    </div>


                </div>
        



                <button onClick={check}>Check</button>
                <div>
                <button onClick={close}>Close</button>
                {userState.userRole.toLowerCase() !== "root" &&
                     <button onClick={changingInfo}> {changeInfo? "Cancel" : "Edit"}</button>
                }
                <button>Reset Password</button>
           
                {/* HTML5 has a form attribute for button that uses the form id.
                This way we can put the button outside of the form, for styling purposes*/}
                {changesMade && 
                    <button type="submit" form="edit_form" >Save</button>
                }
                </div>

            </div>
            

        </Modal>

    )
}

export default AdminEditUser
