import React, {useContext, useState, useEffect, useReducer, useRef} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import { UserContext } from '../context/UserContext';
import Modal from 'react-modal';
import {getAllUsesInOrg} from '../../services/OrganizationService';
import { signUp, addOrganizationToUser } from '../../services/UserService'
import {ERROR} from '../constants/error';

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

    const [error, errorDispatch] = useReducer(errorReducer, {
        exist: false,
        errorMessage: ""
    })

    const tableConfig = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
        perPage: 1,
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

    const [tablePages, setTablePages] = useState([])
    const [visiblePages, setVisiblePages] = useState([])

    const setOrgUsersToNewList = (newList) => {
        setOrganization({
            ...organization,
            users: newList
        })

        if(newList.length > tableConfig.perPage){
           
            //https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
            
            //if the list change, then so will the number of pages.
            //this is to calculate the number of pages there needs to be
            let lastPage = Math.ceil(newList.length/tableConfig.perPage);
            // let lastPage = 90;
            let pages = Array.from(new Array(lastPage), (x,y) => y+1);
            setTablePages(pages);

            changePage(currentPage, pages);
        }

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

    const pageNum = useRef();
    const currentActivePageNum = useRef(0);

    const changePage = (number, pages) => {
        //This will change the data shown in the table
        setCurrentPage(number);

        ////Everything else below is the pagination logic

        //put upper and lower adjustment so there will only need to be one place to change the text
        //if we change the object property name
        const upperAdjustment = tableConfig.numOfPageBthAfter;
        //we add one here to include the active number in the total. We could have put it in the
        //BtnAfter, then we would just have to adjust some calculations
        const lowerAdjustment = tableConfig.numOfPageBthBefore +1;

        //These upper and lower limit is to be used to get the index for the slice.
        const upperLimit = number + upperAdjustment;
        const lowerLimit = number - lowerAdjustment;

        //this is just the total number of pagination button that would be shown.
        //That will just be the combined adjustments.
        const totalPages = upperAdjustment + lowerAdjustment;

        //The last page is the length as slice is non-inclusive at the end. So we need to have the last index+1
        const lastPage = pages.length;

        //This is to calculate the page number that will trigger the logic to not add anymore pages.
        //We need this for the edge case where the we have the last page already appearing
        const lastMinusTotal = lastPage - totalPages;

        //This will change the active className to the page that is clicked.
        if(pageNum.current.children.length > 1){
            pageNum.current.children[currentActivePageNum.current].classList.remove("active");
        }

        if (number >= tableConfig.numOfPageBthBefore + 1 && number <= lastPage - (upperAdjustment + 1) ) {

            //The active page will always be in the middle if there are enough pages and the total pages
            //does not cover the whole page.
            if(pageNum.current.children.length > 1){
                currentActivePageNum.current = lowerAdjustment-1;
                pageNum.current.children[lowerAdjustment-1].classList.add("active");
            }

            
            //we only want a subsection of the total page array. So we can slice it
            //Just make sure that slice is non-inclusive for the upperlimit.
            return setVisiblePages(pages.slice(lowerLimit, upperLimit));

        }else if(number < lowerAdjustment){
          
            if(pageNum.current.children.length > 1){
                let pageIndex = (number % totalPages);
                pageIndex = pageIndex === 0? totalPages -1: pageIndex -1;
                currentActivePageNum.current = pageIndex;
                pageNum.current.children[pageIndex].classList.add("active");
            }

            return setVisiblePages(pages.slice(0, totalPages));
 
        }else{
           
       
            if(pageNum.current.children.length > 1){
                let pageIndex = (number % totalPages);
                pageIndex = pageIndex === 0? totalPages -1: pageIndex -1;
                currentActivePageNum.current = pageIndex;
                pageNum.current.children[pageIndex].classList.add("active");
            }
            //if the totalpages is more that the available pages, the lower limit will be a negative
            //slice goes backwards if it has a negaive number. We do not want that, so we have a logic
            //to make sure that the lower limit does not go below 0
            return setVisiblePages(pages.slice(lastMinusTotal > 0? lastMinusTotal : 0, lastPage))

        }
    }



    const onKeyPress = (e) => {
        let value = e.target.value;
        if(e.key === "Enter"){
            //need to parse int because the value we get is in string format
            if(Number.isInteger(parseInt(value)) && value > 0 && value <= tablePages.length){
                changePage(parseInt(value), tablePages);
            }
            e.target.value = '';
        }

    }


    const [shake, setShake] = useState(false)
    const [editUser, setEditUser] = useState(false)

    const editUserBtn = (user) => {
        setEditUser(!editUser);
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

                    { error.exist && 
                
                    // this is how you do animiation. You use a useState and then add the class in
                    <div className={shake? "error_message shake" : "error_message" }
                        onAnimationEnd={() => setShake(false)}
                    >
                        <p>{error.errorMessage}</p>
                    </div>
                    
                    }

                    <div className="modal_form_inputs">

                        {/* <button type="button" onClick={check}>check</button> */}
                        <div className="modal_column">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" required onChange={onChange}></input>

                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" required onChange={onChange}></input>

                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" required onChange={onChange}></input>

                            <label htmlFor="phoneNumber">PhoneNumber (Opt)</label>
                            <input type="text" name="phoneNumber" 
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                            onChange={onChange}></input>
                        </div>

                        <div className="modal_column">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" required onChange={onChange}></input>

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required onChange={onChange}></input>

                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" name="password" required ref={confirmPassword}></input>


                            {/* if option value is "" it will cause a validation error if the 
                            required tagged is there. */}
                            <label htmlFor="userRole">User Role:</label>
                            <select name="userRole" onChange={onChange} required>
                                <option value="" disabled>Select Role...</option>
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

            <Modal
                isOpen={IsOpen} 
            >

                

            </Modal>



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


                        {tablePages.length > 1? 
                        
                            <div className="pagination">
                                    <div className="page_numbers" ref={pageNum}> 
                                        {visiblePages.map((num, index)=>
                                            <button key={"page_btn_num_" + index}
                                            className={index === 0? "active": ""}
                                            type="button" onClick={() => changePage(num, tablePages)}>{num}</button>
                                        )}

                                    </div>
                                    <div className="page_input">
                                        <input type="number" min={1} max={tablePages.length}    
                                        placeholder="pg#"
                                        
                                        onKeyPress={(e) => onKeyPress(e)}></input>

                                    </div>
                            </div>
                          :                        
                            <div></div>
                        }            


                    </div>


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
