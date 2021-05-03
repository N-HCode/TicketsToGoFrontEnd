import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const addClientOrg = (ClientOrganization) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/clients_organization/add`,ClientOrganization)
}

const findClientOrgBasedOnSearchCriteria = (searchTerm, pageNo) => {


    return axiosForGetRequests.get(`http://localhost:8080/clients_organization/search/${pageNo}?searchTerm=${searchTerm}`)
}

export {addClientOrg, findClientOrgBasedOnSearchCriteria};