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
    const [userProperties, setUserProperties] = useState(Object.entries(userState));
    const [changeInfo, setChangeInfo] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const close = () => {
        setUserState(null);
        cancelEditUser();
    }

   

    const changingInfo = () => {
        setChangeInfo(!changeInfo);
    }

    const oldRole = useRef(userState.userRole);

    const onChange = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        })

        if (e.target.value !== oldRole.current) {
            setChangesMade(true);
        }else{
            setChangesMade(false);
        }
        

    }

    const check = () => {
        console.log(userState);
        // var word = "hhrrllllo";
        // console.log(/[A-Z]/.test(word));
        var word = Object.entries(userState)[0][0];
        // var newWord = word.replace(/[A-Z]/g)
        // console.log(newWord)
        // console.log(word.search(/[A-Z]/));
        console.log(word);
        console.log(word !== "userId" && word !== "tickets")
        console.log(userProperties);
    }
    
    const UserRole = () => {
        return(
            <div>
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
                
                <div style={{"display" : "flex"}}>

                    <div>
                        {/* {userProperties.map((array, index) => 

                            <div>
                                {(array[0] !== "userId" && array[0] !== "tickets") &&
                                // regular express to search if there is a uppercase character in the string or now
                                    <p>{/[A-Z]/.test(array[0])? 
                                        //finds the index of the capital letter then, replace it with a space + that capital letter.
                                        //Then also make the first letter an uppercase.
                                        array[0].replace(array[0].charAt(array[0].search(/[A-Z]/)), " "+array[0].charAt(array[0].search(/[A-Z]/)))
                                        .replace(array[0].charAt(0), array[0].charAt(0).toUpperCase())
                                        
                                        + ": "
                                        : 
                                        //this replaces the first character of a string with an uppercase
                                        array[0].replace(array[0].charAt(0), array[0].charAt(0).toUpperCase()) + ": " }</p>
                            
                            
                                }
                            </div>

                        
                        )} */}
                        <p>Username :</p>
                        <p>Password :</p>
                        <p>First Name :</p>
                        <p>Last Name :</p>
                        <p>Full Name :</p>
                        <p>Email :</p>
                        <p>Phone Number :</p>
                        <p>User Role :</p>
                        <p>Date Created :</p>
                        <p>Last Login:</p>
                        <p>Last Modified :</p>
                    </div>

                    <div>
                       
                         <p>{userState.username === null? <br/> : userState.username}</p>
                         <p>*****</p>
                         <p>{userState.firstName === null? <br/> : userState.firstName}</p>
                         <p>{userState.lastName === null? <br/> : userState.lastName}</p>
                         <p>{userState.fullName === null? <br/> : userState.fullName}</p>
                         <p>{userState.email === null? <br/> : userState.email}</p>
                         <p>{userState.phoneNumber === null? <br/> : userState.phoneNumber}</p>
                         < UserRole />
                         
                         <p>{userState.dateCreated === null? <br/> : userState.dateCreated}</p>
                         <p>{userState.lastLogin === null? <br/> : userState.lastLogin}</p>
                         <p>{userState.lastModified === null? <br/> : userState.lastModified}</p>

                   

                        
                    </div>


                </div>
        



                <button onClick={check}>Check</button>
                <div>
                <button>Cancel</button>
                <button>Reset Password</button>
                <button onClick={changingInfo}>Change Info</button>
                {changesMade && 
                    <button>Save</button>
                }
                </div>

            </div>
            

        </Modal>

    )
}

export default AdminEditUser
