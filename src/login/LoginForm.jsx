/* Imports */
import React, {useState} from "react";
import { useUserActions } from "../hooks/user.actions";
import "./login.css"
import "../colors.css"



/* Login function */
function LoginForm() {
    /* States */    
    const [validated, setValidated] = useState('false');
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    /* Constants */
    const userActions = useUserActions();


    /* Handle submit */
    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false) {            
            event.stopPropagation();
        }

        setValidated('true');

        const data = {
            email: email,
            password: password,
        };
        
        
        /* Axios */
        userActions
            .login(data)
            .catch((err) => {
                if(err.message) {
                    setError(err.request.response);
                }
            });
    }



    /* Return */
    return (        
        <form id="form-login" onSubmit={handleSubmit} noValidate validated={validated}>
            <label htmlFor="email">Email</label>
            <input 
                type="email"
                id="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password"                 
                id="password"
                autoComplete="off" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
            />

            <div>
                {error && <p>{error}</p>}
            </div>

            <button type="submit">Enter</button>
        </form>
    )
}



/* Exports */
export default LoginForm;



