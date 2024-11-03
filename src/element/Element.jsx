/* Imports */
import React, { useEffect, useState } from "react";
import Navigationbar from "../navbar/Navbar";
import ElementCard from "./ElementCard";
import ElementBar from "./ElementBar";
import "./css/element.css"
import DeleteModal from "./DeleteModal";
import axiosService from "../helpers/axios";
import ViewModalProcess from "./ViewModal";
import returnData from "../data";
import { useNavigate } from "react-router-dom";



/* Element page */
function ElementPage() {
    const navigate = useNavigate();

    /* States */        
    const [elements, setElements] = useState([]);
    const [count, setCount] = useState();
    const [showModal, setShowModal] = useState('none');
    const [showViewModal, setShowViewModal] = useState({
        display:'none',
        public_id:''
    });
    const [elementToDelete, setElementToDelete] = useState({
        element_type:'',
        letter:'',
        name:'',
        public_id:''
    });
    const [elementDeleted, setElementDeleted] = useState({
        edited:false,
        name:''
    });
    
            
    /* Axios service to fetch the list of all element when page is loaded */
    useEffect(() => {
        axiosService
            .get(`/element`)
            .then(res => res.data)
            .then((data) => {                
                setElements(() => [...data]);                
            })
            .catch((e) => {
                navigate("/");
            })

            //setElements(returnData);
    }, [navigate])       
    

    /* If the element was deleted */
    if (elementDeleted.edited) {
        setElementDeleted((prevState) => {
            return {
                ...prevState,
                edited:false
            }            
        });
        
        axiosService
            .get(`/element`)
            .then(res => res.data)
            .then((data) => {
                setElements(() => [...data]);
            })
            .catch((e) => {
                navigate("/");
            })
    }
    

    /* Handle change select */
    const HandleChangeSelect =  (e, _type, _letter) => {
        let type = e.target.value;
        let letter = _letter.current.value;

        if (e.target.id === "select-letter") {            
            type = _type.current.value;
            letter = e.target.value;
        }                                
                
        
        axiosService
            .get(`/element?type=${type}&letter=${letter}`)
            .then((res) => {
                setElements(() => [...res.data]);                
            })
            .catch((err) => {
                console.error(err);
                navigate("/");
            });

    };


    /* Set the useState constant 'count' that hold the total elements showed */
    useEffect(() => {        
        setCount(() => Object.keys(elements).length);
    }, [elements]);


        
    /* Return */
    return (
        <div>
            <Navigationbar/>

            <ElementBar count={count} onSelectChange={HandleChangeSelect}/>
                        
            <div id="div-cards">
                {elements?.map((element, index) => {

                    //console.log("element: ", element)

                    return (
                        <ElementCard 
                            key={index} 
                            letter={element.letter_display} 
                            name={element.name} 
                            element_type={element.element_type_display}
                            eva_progress={element.eva_progress}
                            eva_made={element.eva_made}                            
                            id={element.id}
                            user_creator={element.user.id}
                            setShowModal={setShowModal}
                            setElementToDelete={setElementToDelete}
                            setShowViewModal={setShowViewModal}
                        />
                    )
                })}
            </div>

            <DeleteModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                elementToDelete={elementToDelete}                
                setElementDeleted={setElementDeleted}
            />

            <ViewModalProcess
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}                
            />
        </div>
    );
}



/* Exports */
export default ElementPage;




