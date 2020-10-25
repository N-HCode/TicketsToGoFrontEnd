import axios from 'axios'

const createOrganization = (organization) => {
    return axios.post("http://localhost:8080/organization/create", organization)
}

export { createOrganization };
