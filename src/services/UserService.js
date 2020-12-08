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

const checkPassword = (userId, password) => {
        return axios.get(`http://localhost:8080/user/check/${userId}?password=${password}`);
  
}

const checkUsername = (username) => {
    return axios.get(`http://localhost:8080/user/checkusername?username=${username}`);

}

export  { loginUser, signUp, addOrganizationToUser, editUser, checkPassword, checkUsername};