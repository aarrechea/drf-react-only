/* Imports */
import axios from "axios";
import { useNavigate } from "react-router-dom";



// Base url
const BASE_URL = process.env.REACT_APP_API_URL;



/* User actions */
function useUserActions() {            
    /* Constants */
    const navigate = useNavigate();
    

    /* Login function */
    function login(data) {        
        return axios
            .post(`${BASE_URL}/auth/login/`, data)
            .then((res) => {                
                setUserData(res);
                navigate("/element")
            })            
    }



    /* Logout function */
    function logout() {
        localStorage.removeItem("auth");
        navigate("/");
    }



    /* Return */
    return{
        login,        
        logout,
    };
}



/* Get the user */
function getUser() {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));    
        return auth.user;    
    } catch (e) {
        console.log("Error: " + e)
    }    
}



/* Get the access token */
function getAccessToken() {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.access;    
    } catch (e) {
        console.log("Error: " + e);
    }        
}



/* Get the refresh token */
function getRefreshToken() {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.refresh;    
    } catch (e) {
        console.log("Error line 75 useraction.js: " + e);
    }    
}



/* Set user data */
function setUserData(data) {
    localStorage.setItem("auth", JSON.stringify({
        access: data.data.access,
        refresh: data.data.refresh,
        user: data.data.user,
    }));
}



/* Exports */
export {
    useUserActions,
    getUser,
    getAccessToken,
    getRefreshToken,
    setUserData
}


