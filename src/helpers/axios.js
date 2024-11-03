/* Imports */
import axios from "axios";
import { getAccessToken, getRefreshToken, getUser } from "../hooks/user.actions";
import createAuthRefreshInterceptor from "axios-auth-refresh";



/* Content-Type header for the POST request constant */
const axiosService = axios.create({
    baseURL: "http://localhost:8000/api", //process.env.REACT_APP_API_URL, //process.env.REACT_APP_API_URL, 
    
    headers: {
        "Content-Type": "application/json",        
    },
});



/* Adding request interceptor to add headers to the request */
axiosService.interceptors.request.use(async (config) => {      
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
})



/* We will resolve the requests and return a resolved or rejected promise */
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);



/* Function that contains the refresh auth logic. This function will be called
    whenever the failed request returns a 401 error */
const refreshAuthLogic = async (failedRequest) => {    
    return axios
        .post(
            "/auth/refresh/", 
            {refresh:getRefreshToken()},
            {baseURL: "http://localhost:8000/api", headers: {Authorization: `Bearer ${getRefreshToken()}`}}
        )
        
        .then((resp) => {            
            const {access} = resp.data;
            
            failedRequest.response.config.headers["Authorization"] = "Bearer " +  access;
            localStorage.setItem("auth", JSON.stringify({access, refresh:getRefreshToken(), user:getUser()}));
        })

        .catch(() => {            
            localStorage.removeItem("auth");
        });
};


createAuthRefreshInterceptor(axiosService, refreshAuthLogic);



/* Exports */
export function fetcher(url) {
  return axiosService
    .get(url)    
    .then((res) => res.data)    
}

export default axiosService;








