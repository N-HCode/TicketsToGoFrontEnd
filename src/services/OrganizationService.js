import axios from 'axios'

const createOrganization = (username, password, organization) => {
    return axios.post(`http://localhost:8080/organization/create?username=${username}&password=${password}`, organization)
}

const findByUserId = (userId) => {
    return axios.get(`http://localhost:8080/organization/user/${userId}`)
}

export { createOrganization, findByUserId };
