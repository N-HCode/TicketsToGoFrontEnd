import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const findContactOrgBasedOnSearchCriteria = (searchTerm, parameterArray) => {

    // @GetMapping("/all_contact_from_client/{id}/{pageNo}/{numberPerPage}")
    return axiosForGetRequests.get(`http://localhost:8080/contact/search/${parameterArray[0]}/${parameterArray[1]}?searchTerm=${searchTerm}`)
}

const createContact = (orgId, contact) => {

    axiosForRequestsOtherThanGet.post(`http://localhost:8080/contact/create/${orgId}`,contact)

}

export {findContactOrgBasedOnSearchCriteria, createContact}
