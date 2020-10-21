import axios from 'axios';

const loginUser = (username, password) => {
    return axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}`)
}

export  { loginUser };