import React, {useState} from 'react';
import FindOrgResultTable from './FindOrgResultTable';
import {findClientOrgBasedOnSearchCriteria} from '../../../../services/ClientOrgService';
import MountAndDismountAnimiation from '../../../../helper/MountAndDismountAnimiation';

const FindExistingOrg = ({closeMainModal}) => {

    const [searchTerm, setSearchTerm] = useState("")

    const [searchResults, setSearchResults] = useState([])

    const [presentation, setPresentation] = useState(
        {
            tableHeaders: ["Name", "Account #", "Address"],
            data:[]
        }
    )

    const onChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //the code below is not needed, because input with required tag will not let you 
        //input nothing

        // if (searchTerm =="") {
        //     return;
        // }


        try {
            //we add the % because we are using a LIKE query. The % is a wildcard in the SQL language
            //we put %25 because that is the code for "%" if we just put a %, it will fail to decode.
            //For Springboot paging, the page starts at 0 line the array.
            const response = await findClientOrgBasedOnSearchCriteria(searchTerm + "%25", 0);
            // console.log(response.data.content);
            setSearchResults(response.data);

            // We created this prenstation data to place this in our table component.
            // This way we can have an semi-interface-like so we can use the same component for
            // other set of data as well.
            const presentationData = response.data.content.map(
                (dataSet) => 
                    {
                        return {
                            id: dataSet.id,
                            name: dataSet.organizationName,
                            address: dataSet.streetAddress + ", " +  dataSet.state + ", " + dataSet.zipcode
                        }

                    }
            )
            setPresentation({
                ...presentation,
                data: presentationData
            })

        } catch (error) {
            //Gets 404 not found error
            setSearchResults({});
        }

     

    }


    return (
        <div>

            <form className="form_modal" onSubmit={onSubmit}>
                <div className="search_form">

                                {/* <label htmlFor="keyword">Search Term:</label> */}
                    <input  type="text" required name="searchTerm"  value={searchTerm || ""} onChange={onChange}></input>

                    <div className="client_org_modal_button form_submit_button">
                        <button>Search</button>
                    </div>

                </div>
                
            </form>
            <div className="form_result_container">
                {/* will put the search result as 0 if there is no results found.
                Since totalElements will be 0 */}
                <p>Search Results: {searchResults.totalElements || 0}</p>

                {/* hasOwnProperty check to see if the object has that property */}
                {searchResults.hasOwnProperty("content") && 
                    
                    <MountAndDismountAnimiation
                    mountAnimiationClass={"open_form_modal"}
                    dismountAnimiationClass={"no_animiation"}
                    isActive={searchResults.hasOwnProperty("content")}>
              
                        <FindOrgResultTable presentation={presentation}
                            closeMainModal={closeMainModal}
                        />   
                    </MountAndDismountAnimiation>
                           

                }



            </div>
        </div>
    )
}

export default FindExistingOrg
