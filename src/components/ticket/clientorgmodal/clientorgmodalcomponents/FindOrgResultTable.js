import React from 'react';

const FindOrgResultTable = ({searchResults}) => {
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
                <tbody>

                {searchResults.map((result,index)=>
                
                <tr key={"result_"+index}>
                    <td><div>{result.organizationName}</div></td>
                    <td><div>{result.id}</div></td>
                    <td><div>{result.streetAddress + ", " +  result.state + ", " + result.zipcode }</div></td>

                </tr>
                
                
                )}




                </tbody>

            </table>
            
            <div className="client_org_modal_button table_select_button">

                <button >Select</button>
            </div>
        </div>
    )
}

export default FindOrgResultTable
