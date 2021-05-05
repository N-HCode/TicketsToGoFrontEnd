import React, {useState, useRef, useContext} from 'react';
import {SelectedOrgContext} from '../../../context/SelectedOrgContext';

const FindOrgResultTable = ({searchResults}) => {

    const [selectedOrg, setSelectedOrg] = useState(null);

    const [selectedOrgContext, setSelectedOrgContext ] = useContext(SelectedOrgContext);

    const tableBody = useRef();


    const changeActive = (e,result) =>{

        let activeButton;

        //placed this in a try, because by default both button do not have the active.
        //so when finding an active button, it will return undefined and gives an error
        //when we try to remove it. It may be faster to just try and fail then to write
        //logic code.
        try {
            //First I used the useRef to get the the div I want to search. This will narrow down
            //what is to be search so that it will have better performance.
            //Then I convert the HTMLcollection into an array to use the find fuction to filter
            //the element with the class name I want.
            activeButton = Array.from(tableBody.current.children).find(item => item.classList.contains("active"));
                //if we click the same active button again, we want to make it not active.
                //so we can just toggle it.
            activeButton.classList.remove("active");
        } catch (error) {

            
        }

            //add active to the button that is clicked.

            if(e.currentTarget != activeButton){
                //current target will actually get the element that has an event listener
                //the tr has the onClick.
                //However, we could also just use parentNode to get the parent, as e.target is the child element
                e.currentTarget.classList.toggle("active");
                setSelectedOrg(result);
            }else{
                setSelectedOrg(null);
            }
    }

    const selectOrg = () => {

        if(selectedOrg != null){
            
            setSelectedOrgContext(selectedOrg)
        }else{
            alert("Please select an Org to add to Ticket")
        }


    }


    return (
        <div >

            <table className="admin_person_table form_result_table">
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Account #</th>
                        <th>Address</th>
 
                    </tr>


                </thead>
                <tbody ref={tableBody}> 

                {searchResults.map((result,index)=>
                
                <tr key={"result_"+index} onClick={(e) => changeActive(e,result)}>
                    <td><div>{result.organizationName}</div></td>
                    <td><div>{result.id}</div></td>
                    <td><div>{result.streetAddress + ", " +  result.state + ", " + result.zipcode }</div></td>

                </tr>
                
                
                )}




                </tbody>

            </table>
            
            <div className="client_org_modal_button table_select_button">

                <button  onClick={selectOrg}>Select</button>
            </div>
        </div>
    )
}

export default FindOrgResultTable
