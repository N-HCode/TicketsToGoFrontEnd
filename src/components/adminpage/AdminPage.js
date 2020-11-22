import React, {useContext, useState, useEffect, useReducer} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import { UserContext } from '../context/UserContext';
import Modal from 'react-modal';
import {getAllUsesInOrg} from '../../services/OrganizationService';
import { signUp, addOrganizationToUser } from '../../services/UserService'

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
    });

    const tableConfig = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
        perPage: 10
    }

    const [currentPage, setcurrentPage] = useState(1);

    const [tablePages, settablePages] = useState([]);

    const [IsOpen, setisOpen] = useState(false);

    const openModal = () => {
        setisOpen(true);
        dispatch({ type: "clear"});
    }

    const addUser = async (e) => {
        e.preventDefault();

        try {
            const response = await signUp(state);
            const userId = response.data.userId;
            await addOrganizationToUser(userId, organization.id);

            const newList = organization.users.slice(0);
            newList.push(response.data);
            setOrgUsersToNewList(newList);

        } catch (error) {
            alert(error);
            return;
        }


        setisOpen(false);
        dispatch({ type: "clear"});

    }

    const cancelAddUser = () => {
        setisOpen(false)
        dispatch({ type: "clear"});
    }


    useEffect(() => {

        //if object has no keys then it most likely is empty and the context
        //was not updated properly
        if (Object.keys(organization).length !== 0) {
            updateToCurrentUsers();
        }
       
        
    }, [])

    const updateToCurrentUsers = async () =>{

        //Since there could be other admin adding users, while we are logged in.
        //We want to get the latest user data and then add it to our context.
        try {
            const response = await getAllUsesInOrg(organization.id);
            response.data.sort(sortForUsers);
            setOrgUsersToNewList(response.data);

        } catch (error) {
            alert(error);
        
        }

    }

    const setOrgUsersToNewList = (newList) => {
        setOrganization({
            ...organization,
            users: newList
        })

        //https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
        let pages = Array.from(new Array((Math.ceil(newList.length/tableConfig.perPage))), (x,y) => y+1);
        settablePages(pages);

    }

    const onChange = (e) => {
        dispatch({type: "onChange", event: e.target})
    }

    const check = () => {
     
        //test
    }

    //sorting functions for users
    const sortForUsers = (a,b) =>{
        if (a.username < b.username) {
            return -1;
        }else if (a.username > b.username){
            return 1;
        }
        return 0;

    }

    //pagination logic
    const lastUserIndex = currentPage * tableConfig.perPage;
    const firstUserIndex = lastUserIndex - tableConfig.perPage;
    const currentUsers = organization.users.slice(firstUserIndex, lastUserIndex);


    const changePage = (number) => {
        setcurrentPage(number)
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
                    <h2>Add User</h2>
                    <p>Add in details to create a new user</p>
                    <hr></hr>

                    <div className="modal_form_inputs">

                        {/* <button type="button" onClick={check}>check</button> */}
                        <div className="modal_column">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" required onChange={onChange}></input>

                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" required onChange={onChange}></input>

                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" required onChange={onChange}></input>

                            <label htmlFor="phoneNumber">PhoneNumber</label>
                            <input type="text" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={onChange} required></input>
                        </div>

                        <div className="modal_column">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" required onChange={onChange}></input>

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required onChange={onChange}></input>

                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" name="password" required onChange={onChange}></input>


                            {/* if option value is "" it will cause a validation error if the 
                            required tagged is there. */}
                            <label htmlFor="userRole">User Role:</label>
                            <select name="userRole" onChange={onChange} required>
                                <option value="" disabled selected>Select Role...</option>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                    </div>    

                    <div className="modal_btn">
                        {/* this creates a reset button that will rest all the values
                        in the form */}
                        {/* <input type="reset" value="reset"/> */}

                        <button type="button" onClick={cancelAddUser}>Cancel</button>
                        <button>Add User</button>
                    </div>    
                </form>

            </Modal>

            <Modal>

            </Modal>



            <div id="admin_page_container">

                <div className="admin_single_page">
                    <div className="admin_single_page_content">

                        <div className="admin_icon_right" onClick={openModal}><i className="material-icons">person_add_alt_1</i></div>

                        <div className="table_container">

                            <table className="admin_person_table">
                                <thead>
                                    <tr>
                                        {tableConfig.headers.map((header) => 
                                            <th>{header}</th>
                                        )}

                                    </tr>

                                </thead>
                                <tbody>

                                {organization.users !== undefined && organization.users.length > 0 && currentUsers.map((user) =>
                                    
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


                        <div className="pagination">
                                {tablePages.map((num)=>
                                    <button type="button" onClick={() => changePage(num)}>{num}</button>
                                )}
                        </div>


                    </div>


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
