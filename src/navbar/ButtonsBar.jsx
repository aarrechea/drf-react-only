/* Imports */
import React, {useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCss from "../components/Button";
import { getUser } from "../hooks/user.actions";
import { useUserActions } from "../hooks/user.actions";
import "../colors.css";
import "./buttonBar.css"
import { onClickBtnMainMenu } from "./navBar";



/* Buttons bar */
function ButtonsBar({click}) {
    /* Constants */    
    const userActions = useUserActions();     
    const user = getUser()    
    const style = {height:'2rem', backgroundColor: 'var(--brown_100)', 
                    fontSize: '1.0rem', borderWidth: '0', textAlign:'center'};
    const styleDisabled = {height:'2rem', backgroundColor: 'var(--brown_100)',
        fontSize: '1.0rem', borderWidth: '0', textAlign:'center', fontStyle:'italic'};

    const navigate = useNavigate();
    const location = useLocation();


    // On scroll initial Y position
    let prevScrollpos = window.scrollY;


    // On scroll
    window.addEventListener('scroll', () => {
        let currentScrollPos = window.scrollY;

        if (prevScrollpos > currentScrollPos) {        
            if (document.getElementById("background_menu")) {
                document.getElementById("background_menu").style.top = '0';    
            }
            
            if (document.getElementById("div-main")) {
                document.getElementById("div-main").style.top = '4rem'    
            }        

            if (document.getElementById("div-element-bar")) {
                document.getElementById("div-element-bar").style.top = '7.5rem'    
            }        

        } else {      
            if (document.getElementById("background_menu")) {
                document.getElementById("background_menu").style.top = '-4rem';
            }

            if (document.getElementById("div-main")) {
                document.getElementById("div-main").style.top = '0rem'
            }
                    
            if (document.getElementById("div-element-bar")) {
                document.getElementById("div-element-bar").style.top = '3.5rem'    
            }        
        }

        prevScrollpos = currentScrollPos;
    });

    
    /* Use Effect */
    useEffect(() => {        
        onClickBtnMainMenu(location.pathname);
    })
        

    
    /* Return */
    return (
        <>
            <div id="div-main" style={{top:'4rem'}}>
                <div className="navbar" style={{padding:0}}>
                    <ButtonCss
                        onClick={() => navigate('/evaluations-page')}
                        children="Evaluations"
                        style={style}
                        dataPage="/evaluations-page"
                        value="Evaluations"
                    />
                    
                    <ButtonCss
                        children="Companies"
                        onClick={() => navigate('/companies-page')}
                        dataPage="/companies-page"
                        style={style}
                        value="Companies"
                        className='btnMainMenu'
                    />
                                            
                    {parseInt(user.user_type) < 4 
                        ?   
                            <>
                                <ButtonCss
                                    onClick={() => navigate('/relation-page')}
                                    children="Relations"
                                    style={style}                                    
                                    value="Relations"
                                    dataPage="/relation-page"
                                    className='btnMainMenu'
                                />                         

                                <ButtonCss
                                    onClick={() => navigate('/element')}
                                    children="Elements"
                                    style={style}
                                    value="Elements"
                                    dataPage='/element'
                                    className='btnMainMenu'
                                />
                            </>                            
                        : null
                    }

                    {parseInt(user.user_type) < 5
                        ?
                            <>
                                <ButtonCss                                    
                                    children="Users"
                                    style={styleDisabled}
                                    value="Users"
                                    className='btnMainMenu'
                                />
                                
                                <ButtonCss                                     
                                    children="Administration"                                    
                                    style={styleDisabled}
                                    value="Administration"
                                    className='btnMainMenu'                                    
                                />
                            </>
                        : null
                    }

                    <ButtonCss 
                        onClick={() => userActions.logout()}                         
                        children="Logout"
                        style={style}                        
                    />

                    <ButtonCss                        
                        children="Reset password"
                        style={styleDisabled}
                        value="Reset password"
                    />            
                </div>
            </div>        
        </>
    )
}



/* Exports */
export default ButtonsBar;







