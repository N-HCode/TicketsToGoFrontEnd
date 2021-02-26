import axios from 'axios';
import customAxios from "./config/AxiosConfig"

//There is an "auth" parameter for Basic Auth:
//https://github.com/axios/axios

const loginAPI = (username, password) => {
    
    //For spring security form login or we need to use 'application/x-www-form-urlencoded'
    //axios is smart enough when you use a string it will have the content type.
    return customAxios.post(`http://localhost:8080/login`,
    { 
        username: username,
        password: password
    })
    
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

const deleteUser = (userId) => {
    return axios.delete(`http://localhost:8080/user/${userId}`);

}

const verify = () => {
    return axios.get(`http://localhost:8080/user/verify`);
}

export  { loginAPI, signUp, addOrganizationToUser, editUser, checkPassword, checkUsername, deleteUser, verify};