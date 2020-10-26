import axios from 'axios'

const createOrganization = (username, password, organization) => {
    return axios.post(`http://localhost:8080/organization/create?username=${username}&password=${password}`, organization)
}

export { createOrganization };
