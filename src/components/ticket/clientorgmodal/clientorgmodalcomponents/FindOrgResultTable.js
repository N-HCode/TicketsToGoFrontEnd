import React, {useState, useRef, useContext} from 'react';


const FindOrgResultTable = ({presentation, closeMainModal, providedContext}) => {

    const [selectedOrg, setSelectedOrg] = useState(null);

    const [context, setContext ] = useContext(providedContext);

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
            
            setContext(selectedOrg);
            closeMainModal();
            
        }else{
            alert("Please select an Org to add to Ticket")
        }


    }


    return (
        <div >

            <table className="admin_person_table form_result_table">
                <thead>

                    <tr>
                        {presentation.tableHeaders.map((title, index) =>         
                            <th key={"table_header_" + index}><div>{title}</div></th>        
                        )}

                    </tr>


                </thead>
                <tbody ref={tableBody}> 

                {presentation.data.map((data,index)=>
                
                <tr key={"result_"+index} onClick={(e) => changeActive(e,data)}>
                    {Object.values(data).map((value, index2)=>
                        <td key={"table_"+index+"_"+index2 }><div>{value}</div></td>
                    )}

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
