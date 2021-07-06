import React, {useContext, useState, useEffect, useRef} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import {getAllUserInOrg} from '../../services/OrganizationService';
import AdminAddUser from './admincomponents/AdminAddUser'
import AdminEditUser from './admincomponents/AdminEditUser';
import Pagination from '../pagination/Pagination'

const AdminPage = () => {

    const tableConfig = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
    }

    const [listOfUsers, setListOfUsers] = useState([])
    
    const paginationConfig = {
        perPage: 5,
        numOfPageBthAfter: 2,
        numOfPageBthBefore: 2
    }

    const [currentPage, setCurrentPage] = useState(0);

    const [IsOpen, setisOpen] = useState(false);

    const [totalPages, setTotalPages] = useState(0);

    const openModal = () => {
        setisOpen(true);
    }

    const confirmPassword = useRef();

    const cancelAddUser = () => {
        setisOpen(false)
    }


    useEffect(() => {
     
        updateToCurrentUsers(currentPage);

    }, [currentPage])

    const updateToCurrentUsers = async (pageNum) =>{

        //Since there could be other admin adding users, while we are logged in.
        //We want to get the latest user data and then add it to our context.
        try {
            const response = await getAllUserInOrg(pageNum,paginationConfig.perPage);
            // console.log(response);

            setTotalPages(response.data.totalPages);
            setListOfUsers(response.data.content);

        } catch (error) {
            alert(error);
        
        }

    }

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
                
            { IsOpen && <AdminAddUser IsOpen={IsOpen} cancelAddUser={cancelAddUser}
             confirmPassword={confirmPassword} updateToCurrentUsers={updateToCurrentUsers} currentPage={currentPage}/>}

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

                                {listOfUsers.length > 0 && listOfUsers.map((user,index) =>
                                    
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
                            numberOfPages={totalPages}
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
