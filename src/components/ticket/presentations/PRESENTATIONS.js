import {findClientOrgBasedOnSearchCriteria} from '../../../services/ClientOrgService'


// This will determine the presentation of the table that we pass into the component
const clientOrgPresentation = 
    {
        tableHeaders: ["Name", "Account #", "Address"],
        data:[],
        dataFunction : (dataSet) => {

            return {
                // make sure the properties are created in the same order as the headers
                name: dataSet.organizationName,
                id: dataSet.id,
                address: dataSet.streetAddress + ", " +  dataSet.state + ", " + dataSet.zipcode
            }
        },
        // This is the API/REST function that will be used to get the data that the data function uses
        // if we just do this, the property will be like an alias for the function used for the value
        serviceFunction: findClientOrgBasedOnSearchCriteria
    }


export {clientOrgPresentation}