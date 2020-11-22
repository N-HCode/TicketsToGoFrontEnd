import axios from 'axios'

const createOrganization = (username, password, organization) => {
    return axios.post(`http://localhost:8080/organization/create?username=${username}&password=${password}`, organization)
}

const findByUserId = (userId) => {
    return axios.get(`http://localhost:8080/organization/user/${userId}`)
}

const getAllUsesInOrg = (orgId) => {
    return axios.get(`http://localhost:8080/organization/getAllUser/${orgId}`)
}



export { createOrganization, findByUserId, getAllUsesInOrg };
