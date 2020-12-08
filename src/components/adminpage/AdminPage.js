import React, {useContext, useState, useEffect, useReducer, useRef} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import Modal from 'react-modal';
import {getAllUsesInOrg} from '../../services/OrganizationService';
import { signUp, addOrganizationToUser } from '../../services/UserService'
import {ERROR} from '../constants/Error';
import AdminAddUser from './admincomponents/AdminAddUser'
import AdminEditUser from './admincomponents/AdminEditUser';
import Pagination from '../pagination/Pagination'


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
        case "setUser":
            return action.user
  
        default:
            return state;
    }
}

const errorReducer = (state, action) => {
    switch(action.type){
        case "error":
            return{
                exist: true,
                errorMessage: action.errorMessage
            }
        case "clearErrors":
            return {
                exist: false,
                errorMessage: ""
            }
        default:
            return state;
    }
}

const AdminPage = () => {

    const [organization, setOrganization] = useContext(OrganizationContext);

    const [state, dispatch] = useReducer(reducer,{ 
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        userRole: null
    });

    const [error, errorDispatch] = useReducer(errorReducer, {
        exist: false,
        errorMessage: ""
    })

    const tableConfig = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
    }
    
    const paginationConfig = {
        perPage: 5,
        numOfPageBthAfter: 2,
        numOfPageBthBefore: 2
    }

    const [currentPage, setCurrentPage] = useState(1);

    const [IsOpen, setisOpen] = useState(false);

    const openModal = () => {
        setisOpen(true);
        dispatch({ type: "clear"});
    }

    const confirmPassword = useRef();

    const addUser = async (e) => {
        e.preventDefault();

        if (state.password !== confirmPassword.current.value) {
            setShake(true);
            return errorDispatch({type: "error", errorMessage: ERROR.confirmPW})

        }else{
            
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
    
            
            confirmPassword.current.value = null;
            dispatch({ type: "clear"});
            errorDispatch({type: "clearErrors"});
            setisOpen(false);
        }


    }

    const cancelAddUser = () => {
        
        errorDispatch({type: "clearErrors"});
        dispatch({ type: "clear"});
        setisOpen(false)
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

    

    const [totalNumOfPages, setTotalNumOfPages] = useState(0);
    const lastUserIndex = currentPage * paginationConfig.perPage;
    const firstUserIndex = lastUserIndex - paginationConfig.perPage;
    const currentUsers = organization.users.slice(firstUserIndex, lastUserIndex);

    const setOrgUsersToNewList = (newList) => {
        setOrganization({
            ...organization,
            users: newList
        })
   

        if(newList.length > paginationConfig.perPage){
           
            //https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
            
            //if the list change, then so will the number of pages.
            //this is to calculate the number of pages there needs to be
            console.log(Math.ceil(newList.length/paginationConfig.perPage));
            setTotalNumOfPages(Math.ceil(newList.length/paginationConfig.perPage));
            // let lastPage = 90;

        }else{
            setTotalNumOfPages(0);
            setCurrentPage(1);
        }

    }





    const onChange = (e) => {
        dispatch({type: "onChange", event: e.target})
    }

    // const check = () => { 
    //     console.log(totalNumOfPages)
    // }

    //sorting functions for users
    const sortForUsers = (a,b) =>{
        if (a.username < b.username) {
            return -1;
        }else if (a.username > b.username){
            return 1;
        }
        return 0;

    }


    const [shake, setShake] = useState(false)
    const [editingUser, setEditUser] = useState(false)

    const currentEditUser = useRef()
    const editUserBtn = (user) => {
        setEditUser(true);
        currentEditUser.current = user;
    }

    
    const cancelEditUser = () => {
        currentEditUser.current = null;
        setEditUser(false);
    }

    return (
        <div className="main_container">
                
            { IsOpen && <AdminAddUser IsOpen={IsOpen} cancelAddUser={cancelAddUser} onChange={onChange} 
            shake={shake} setShake={setShake} error={error} addUser={addUser} confirmPassword={confirmPassword}/>}

            { editingUser && <AdminEditUser currentEditUser={currentEditUser} editingUser={editingUser} cancelEditUser={cancelEditUser}
            updateToCurrentUsers={updateToCurrentUsers}/>}


     
            <div id="admin_page_container">

                <div className="admin_single_page">
                    <div className="admin_single_page_content">

                        <div className="admin_icon_right" onClick={openModal}><i className="material-icons">person_add_alt_1</i></div>

                        <div className="table_container">

                            <table className="admin_person_table">
                                <thead>
                                    <tr>
                                        {tableConfig.headers.map((header, index) => 
                                            <th key={"admin_header_"+index}>{header}</th>
                                        )}

                                    </tr>

                                </thead>
                                <tbody>

                                {organization.users !== undefined && organization.users.length > 0 && currentUsers.map((user,index) =>
                                    
                                    <tr key={"admin_table_row_" + index}>
                                        <td><div><i className="material-icons" onClick={() => editUserBtn(user)}>edit</i></div></td>
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

                        <Pagination 
                            // numberOfPages={totalNumOfPages}
                            numberOfPages={totalNumOfPages}
                            paginationConfig={paginationConfig}
                            changeShownDataByPageNum={setCurrentPage}
                        />

                    </div>


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
