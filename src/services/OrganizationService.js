import axios from 'axios';
import customAxios from "./config/AxiosConfig";

const createOrganization = (username, password, organization) => {
    return axios.post(`http://localhost:8080/organization/create?username=${username}&password=${password}`, organization)
}

const findByUserId = (userId) => {
    return axios.get(`http://localhost:8080/organization/user/${userId}`)
}

const getAllUserInOrg = (orgId) => {
    return customAxios.get(`http://localhost:8080/organization/getAllUser/${orgId}`)
}



export { createOrganization, findByUserId, getAllUserInOrg };
