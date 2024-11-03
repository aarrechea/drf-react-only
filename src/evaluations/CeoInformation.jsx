// Imports
import React from "react";
import "./css/ceoInformation.css";
import { GeneralDiv } from "./InProgressFirst";




// Ceo information components
const CeoInformation = ({setSaveDisabled, dataModel, setDataModel}) => {
    return (
        <>
            <div id="divCeoInformation">
                <label htmlFor="selectCeoTitle">Title</label>
                <label htmlFor="ceoName">First name</label>
                <label htmlFor="ceoSurname">Last name</label>

                <select 
                    onChange={() => setSaveDisabled(false)} 
                    className="toSend" 
                    id="selectCeoTitle"
                    defaultValue={dataModel.ceo_title}
                >
                    <option value="1">Mr</option>
                    <option value="2">Mrs</option>
                </select>                
                <input 
                    onChange={() => setSaveDisabled(false)} 
                    maxLength={50} 
                    type="text" 
                    id="ceoName" 
                    className="toSend"
                    defaultValue={dataModel.given_name}
                />
                
                <input 
                    onChange={() => setSaveDisabled(false)} 
                    maxLength={50} 
                    type="text"
                    id="ceoSurname" 
                    className="toSend"
                    defaultValue={dataModel.family_name}
                />
            </div>

            <div id="divCeoInformationGender">
                <label htmlFor="selectCeoGender">Gender</label>
                <label htmlFor="ceoTelephone">Telephone</label>
                <label htmlFor="ceoEmail">Email</label>

                <select 
                    onChange={() => setSaveDisabled(false)}  
                    className="toSend" 
                    id="selectCeoGender"
                    defaultValue={dataModel.gender}
                >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>  

                <input 
                    onChange={() => setSaveDisabled(false)} 
                    maxLength={20} 
                    type="text" 
                    id="ceoTelephone" 
                    className="toSend"
                    defaultValue={dataModel.telephone}
                />

                <input 
                    onChange={() => setSaveDisabled(false)} 
                    maxLength={50} 
                    type="email" 
                    id="ceoEmail" 
                    className="toSend"
                    defaultValue={dataModel.email}
                />
            </div>

            <div id="divCeoInformationPosition">
                <div>
                    <label htmlFor="businessPosition">Business position</label>
                    <input 
                        onChange={() => setSaveDisabled(false)} 
                        maxLength={50} 
                        type="text" 
                        id="businessPosition" 
                        className="toSend" 
                        defaultValue={dataModel.business_position}
                    />
                </div>
                                    
                <GeneralDiv
                    name={"Years in the post"}                        
                    state={dataModel.years_in_the_post}
                    field={"years_in_the_post"}
                    array={[0, 100]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />
            </div>                
        </>            
    )
};



// Export
export default CeoInformation;

