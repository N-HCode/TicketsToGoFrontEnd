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
    const [changeRole, setChangeRole] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const close = () => {
        setUserState(null);
        cancelEditUser();
    }

   

    const changingRole = () => {
        setChangeRole(!changeRole);
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
        console.log(userState)
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
                <p>First Name: {userState.firstName}</p>
                <p>Last Name: {userState.lastName}</p>
                <p>Username: {userState.username}</p>
                <div>
                    <label htmlFor="userRole">Password: {userState.password}</label><button>Reset Password</button>
                </div>
                <p>Email: {userState.email}</p>
                <p>Phone Number: {userState.phoneNumber}</p>

                {userState.userRole !== "root"? 
                
                <div>
                        
                    { changeRole? 
                        <div> 
                            <label htmlFor="userRole">User Role:</label>
                            <select name="userRole" onChange={onChange}>
                            <option value="" disabled selected>{userState.userRole}</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            </select>

                        </div>



                        :

                        <label htmlFor="userRole">User Role: {userState.userRole}</label>

                    }

                    <button onClick={changingRole}>Change role</button>

                    

                </div>

                :

                <p>User Role: root</p>
        
            
                }

                <button onClick={check}>Check</button>
                {changesMade && <button >Save</button>}

            </div>
            

        </Modal>

    )
}

export default AdminEditUser
