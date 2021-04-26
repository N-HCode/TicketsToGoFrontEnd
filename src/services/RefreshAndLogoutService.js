import { axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const logoutApplication = () => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/auth/logout`);
}

export {logoutApplication};