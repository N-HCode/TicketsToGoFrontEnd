import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const addClientOrg = (ClientOrganization) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/clients_organization/add`,ClientOrganization)
}

export {addClientOrg};