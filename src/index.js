/* Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';



/* Constants */
const root = ReactDOM.createRoot(document.getElementById('root'));



/* Root */
root.render(
    // Strict mode helps us receive warnings int hte development mode
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>    
    </React.StrictMode>
);



