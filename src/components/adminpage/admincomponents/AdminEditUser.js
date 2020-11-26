import React, { useState,useReducer} from 'react';
import Modal from 'react-modal';
import { OrganizationContext} from '../../context/OrganizationContext';

const AdminEditUser = ({currentEditUser, editUser, cancelEditUser}) => {

    // username: null,
    // password: null,
    // firstName: null,
    // lastName: null,
    // email: null,
    // phoneNumber: null,
    // userRole: null
    const [userState, setUserState] = useState(currentEditUser.current)

    const close = () => {
        setUserState(null);
        cancelEditUser();
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
                <p>First Name: {userState.password}</p>
                <p>Email: {userState.email}</p>
                <p>Phone Number: {userState.phoneNumber}</p>
                <label htmlFor="userRole">User Role:</label>
                <select name="userRole" required>
                    <option value="" disabled selected>{userState.userRole}</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
            

        </Modal>

    )
}

export default AdminEditUser
