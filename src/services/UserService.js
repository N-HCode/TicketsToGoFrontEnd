import axios from 'axios';

const loginUser = (username, password) => {
    return axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}`)
}

const signUp = (user) => {
    return axios.post("http://localhost:8080/user/create", user)
}

const addOrganizationToUser = (id, organizationId) => {
    return axios.post(`http://localhost:8080/user/organization?id=${id}&organizationId=${organizationId}`)
}


const editUser = (userId, userModel) => {
    return axios.put(`http://localhost:8080/user/${userId}`, userModel);
}

export  { loginUser, signUp, addOrganizationToUser, editUser};