import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const createOrganization = (username, password, organization) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/organization/create?username=${username}&password=${password}`,
     organization,
    //  This is the Csrf token Cookie from the spring security that we put in the header
     {
         headers:{
             "X-XSRF-TOKEN": document.cookie.match("XSRF-TOKEN").input.replace("XSRF-TOKEN=","")
         }
     }
     )
}

const findByUserId = (userId) => {
    return axiosForGetRequests.get(`http://localhost:8080/organization/user/${userId}`)
}

const getAllUserInOrg = (orgId) => {
    return axiosForGetRequests.get(`http://localhost:8080/organization/getAllUser/${orgId}`)
}



export { createOrganization, findByUserId, getAllUserInOrg };
