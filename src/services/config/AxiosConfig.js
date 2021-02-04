import axios from 'axios'

export default axios.create({
    //create an axios instance that have some preset configurations. Allows the main App.js to be cleaner
    withCredentials: true
})