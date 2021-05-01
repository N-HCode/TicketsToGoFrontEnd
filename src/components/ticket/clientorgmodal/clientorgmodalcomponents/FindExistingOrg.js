import React, {useState} from 'react';
import FindOrgResultTable from './FindOrgResultTable';
import {findClientOrgBasedOnSearchCriteria} from '../../../../services/ClientOrgService';

const FindExistingOrg = () => {

    const [searchTerm, setSearchTerm] = useState("")

    const [searchResults, setSearchResults] = useState(
        {
            data: [] 
        }
    )

    const onChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (searchTerm =="") {
            return;
        }


        try {
            //we add the % because we are using a LIKE query. The % is a wildcard in the SQL language
            //we put %25 because that is the code for "%" if we just put a %, it will fail to decode.
            const response = await findClientOrgBasedOnSearchCriteria(searchTerm + "%25");
            console.log(response);

        } catch (error) {
            
        }

     

    }


    return (
        <form className="form_modal" onSubmit={onSubmit}>
            <div className="search_form">

                            {/* <label htmlFor="keyword">Search Term:</label> */}
                <input  type="text" required name="searchTerm"  value={searchTerm || ""} onChange={onChange}></input>

                <div className="client_org_modal_button form_submit_button">
                    <button>Search</button>
                </div>

            </div>

            {/* {searchResults.data.length > 0 &&  */}
            
                <FindOrgResultTable data={searchResults.data}/>          

            {/* } */}

            
        </form>
    )
}

export default FindExistingOrg
