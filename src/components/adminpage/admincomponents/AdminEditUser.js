import React, { useState,useReducer, useRef} from 'react';
import Modal from 'react-modal';
import { OrganizationContext} from '../../context/OrganizationContext';
import {editUser} from '../../../services/UserService';

const AdminEditUser = ({currentEditUser, editUser, cancelEditUser}) => {

    // username: null,
    // password: null,
    // firstName: null,
    // lastName: null,
    // email: null,
    // phoneNumber: null,
    // userRole: null
    const [userState, setUserState] = useState(currentEditUser.current);
    const [changeInfo, setChangeInfo] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const close = () => {
        setUserState(null);
        cancelEditUser();
    }

   

    const changingInfo = () => {

        if(changeInfo){
            setUserState(currentEditUser.current);
        }

        setChangeInfo(!changeInfo);
    }

    const oldRole = useRef(userState.userRole);

    const onChange = (e) => {

        console.log(e.target.name);
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        })
        

    }

    const check = () => {
        console.log(userState);

    }
    
    const UserRole = () => {
        return(
            <div>
                {userState.userRole !== "root"?
                    <div>
                        { changeInfo? 
                            <div>                             
                                <select name="userRole" onChange={() => onChange()}>
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
            </div>
        )
    }



    return (
        <Modal
            className="modal"
            overlayClassName ="modal_overlay"  
            isOpen={editUser}
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
                        <p>Date Created :</p>
                        <p>Last Login:</p>
                        <p>Last Modified :</p>
                    </div>

                    <div >
                       
                        {/* <p>{userState.username === null? <br/> : userState.username}</p> */}
                        {/* <ChangeToInput name="username" value={userState.username}/> */}

                        {changeInfo?
                        
                        <div className="edit_inputs">
                            <input type="text" name="username" value={userState.username} onChange={ onChange}></input>
                            <p>{userState.password === null? <br/> : userState.password}</p>
                            <input type="text" name="firstName" value={userState.firstName} onChange={ onChange}></input>
                            <input type="text" name="lastName" value={userState.lastName} onChange={ onChange}></input>
                            <input type="text" name="email" value={userState.email} onChange={ onChange}></input>
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
                            <p>{userState.dateCreated === null? <br/> : userState.dateCreated}</p>
                            <p>{userState.lastLogin === null? <br/> : userState.lastLogin}</p>
                            <p>{userState.lastModified === null? <br/> : userState.lastModified}</p>

                        </div>
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
                <button onClick={changingInfo}> {changeInfo? "Cancel" : "Edit"}</button>
                <button>Reset Password</button>
           
                {changesMade && 
                    <button>Save</button>
                }
                </div>

            </div>
            

        </Modal>

    )
}

export default AdminEditUser
