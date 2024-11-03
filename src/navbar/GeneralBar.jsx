/* Imports */
import React from "react";
import { getUser } from "../hooks/user.actions";
import "../colors.css"
import "./generalBar.css"



/* General bar */
function GeneralBar({menu}) {
    /* Return */
    return (
        <div id="background_menu">
            <div id="bar_menu">
                <h3>SME-AS</h3>

                <div id="user_identification">
                    { getUser()
                        ?
                            <>
                                <h6 style={{color:'grey'}}>User:<span>{getUser().email}</span></h6>                                
                            </>
                        :
                            <>
                                <h6 style={{color:'gray'}}>User</h6>
                                <h4>Anonymous</h4>
                            </>
                    }
                </div>                
            </div>
      </div>
    )
}



/* Export */
export default GeneralBar;