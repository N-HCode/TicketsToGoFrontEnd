import React, {useContext, useState, useEffect, useReducer} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import { UserContext } from '../context/UserContext';
import Modal from 'react-modal';
import {getAllUsesInOrg} from '../../services/OrganizationService';

Modal.setAppElement('#root')


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
        default:
            return state;
    }
}

const AdminPage = () => {

    const [organization, setOrganization] = useContext(OrganizationContext);
    const [user] = useContext(UserContext);

    const [state, dispatch] = useReducer(reducer,{ 
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        userRole: null
    })

    const table_config = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
        data: organization.users
    }

    const [IsOpen, setisOpen] = useState(false)

    const openModal = () => {
        setisOpen(true);
        dispatch({ type: "clear"});
    }

    const addUser = (e) => {
        e.preventDefault();
        setisOpen(false);
        dispatch({ type: "clear"});

    }

    const cancelAddUser = () => {
        setisOpen(false)
        dispatch({ type: "clear"});
    }


    useEffect(() => {

        updateToCurrentUsers();
        
    }, [])

    const updateToCurrentUsers = async () =>{

        //Since there could be other admin adding users, while we are logged in.
        //We want to get the latest user data and then add it to our context.
        try {
            const response = await getAllUsesInOrg(organization.id);
            setOrganization({
                ...organization,
                users: response.data

            })
            console.log(response);

        } catch (error) {
            alert(error);
        }

    }

    const onChange = (e) => {
        dispatch({type: "onChange", event: e.target})
    }

    const check = () => {
        console.log(state);
    }


    return (
        <div className="main_container">
                
           
                <Modal 
                className="modal"
                overlayClassName ="modal_overlay"   
                isOpen={IsOpen} 
                shouldCloseOnOverlayClick={false}
                onRequestClose={cancelAddUser}>
                    <form onSubmit={addUser}>
                        <h2>User Profile</h2>
                        <p>Add in details to create a new user</p>
                        <hr></hr>

                        <button type="button" onClick={check}></button>

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required onChange={onChange}></input>

                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" required onChange={onChange}></input>

                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" required onChange={onChange}></input>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" required onChange={onChange}></input>

                        <label htmlFor="email">Username</label>
                        <input type="text" name="email" required onChange={onChange}></input>

                        <label htmlFor="phoneNumber">Username</label>
                        <input type="text" name="phoneNumber" onChange={onChange} required></input>

                        {/* if option value is "" it will cause a validation error if the 
                        required tagged is there. */}
                        <label htmlFor="userRole">User Role:</label>
                        <select name="userRole" onChange={onChange} required>
                            <option value="" disabled selected>Select Role...</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>


                        {/* this creates a reset button that will rest all the values
                        in the form */}
                        <input type="reset" value="reset"/>

                        <button type="button" onClick={cancelAddUser}>Cancel</button>
                        <button>Add User</button>
                    </form>

                </Modal>



            <div id="admin_page_container">
                <div className="admin_single_page">
                    <div className="admin_single_page_content">

                        <div className="admin_icon_right" onClick={openModal}><i className="material-icons">person_add_alt_1</i></div>

                        <div className="table_container">

                            <table className="admin_person_table">
                                <thead>
                                    <tr>
                                        {table_config.headers.map((header) => 
                                            <th>{header}</th>
                                        )}

                                    </tr>

                                </thead>
                                <tbody>

                                {table_config.data !== undefined && table_config.data.length > 0 && table_config.data.map((user, index) =>
                                    
                                    <tr>
                                        <td><div><i className="material-icons">edit</i></div></td>
                                        <td><div>{user.firstName}</div></td>
                                        <td><div>{user.lastName}</div></td>
                                        <td><div>{user.email}</div></td>
                                        <td><div>{user.username}</div></td>
                                        <td><div>{user.userRole}</div></td>
                                        <td><div>{user.lastModified}</div></td>
                                    </tr>
                                    
                                )}


                                </tbody>


                            </table>

                    </div>

                </div>


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
