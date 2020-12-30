import React, {useContext, useState, useEffect, useRef} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import {getAllUserInOrg} from '../../services/OrganizationService';
import AdminAddUser from './admincomponents/AdminAddUser'
import AdminEditUser from './admincomponents/AdminEditUser';
import Pagination from '../pagination/Pagination'

const AdminPage = () => {

    const [organization, setOrganization] = useContext(OrganizationContext);


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
    }

    const confirmPassword = useRef();

    const cancelAddUser = () => {
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
            const response = await getAllUserInOrg(organization.id);
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


    //sorting functions for users
    const sortForUsers = (a,b) =>{
        if (a.username < b.username) {
            return -1;
        }else if (a.username > b.username){
            return 1;
        }
        return 0;

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
             confirmPassword={confirmPassword} organization={organization} setOrgUsersToNewList={setOrgUsersToNewList}/>}

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
