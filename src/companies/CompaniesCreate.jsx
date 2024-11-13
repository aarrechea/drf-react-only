/* Imports */
import React, { useState, useEffect, useRef } from "react";
import CreateEditBar from "../components/CreateEdit";
import axiosService from "../helpers/axios";
import "./css/companiesCreate.css";
import { companyMessageTimeout, getNames, companyResetAfterCreate } from "./js/vaious.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions.js";



/* Company create */
export const CompanyCreate = () => {    
    const [countries, setCountries] = useState([]);    
    const [continent, setContinent] = useState();
    const [region, setRegion] = useState();    
    const [superSector, setSuperSector] = useState([]);    
    const [sector, setSector] = useState([]);    
    const [subSector, setSubSector] = useState([]);

    const navigate = useNavigate();
    
    /* Name */
    const nameRef = useRef();

    /* Geographical data */
    const selectRef = useRef(); // to bring the current country selected
    const cityRef = useRef();
    const postalRef = useRef();
    const addressRef = useRef();            

    /* Industry */
    const industry = useRef([]);
    const selectIndustryRef = useRef();
    const selectSupersectorRef = useRef();
    const selectSectorRef = useRef();
    const selectSubsectorRef = useRef();   

    /* Title of the button and general title */
    const modeRef = useRef(); // Create or edit    
    const titleRef = useRef();
    
    /* Other data */
    const establishmentRef = useRef();    
    const withoutExport = useRef();    
    const [bussinesDescription, setBussinesDescription] = useState();
    const [disabledState, setDisabledState] = useState('disabled');
    const [checkedState, setCheckedState] = useState(true);
    const [yearFirstExport, setYearFirstExport] = useState();
    const yearFirstExpoRef = useRef();
    
    /* Data of the company if the component is in edit mode */
    const companyData = useRef();
    const [companyDataState, setCompanyDataState] = useState({});


    // location has the parameters in navigate hook from companies card jsx
    const location = useLocation();        

    
    // use effect to fill the fields when the mode is edit. It also makes some little changes in
    // the title and the button value (Create or Edit)
    useEffect(() => {
        if (location.state.mode.mode === 'create') {
            modeRef.current = 'Create';
            titleRef.current = 'New company data'            
    
        } else {
            modeRef.current = location.state.mode;
            titleRef.current = 'Edit company data'
    
            axiosService
                .get(`/company/${location.state.id}`)
                .then(res => res.data)
                .then((data) => {                        
    
                    /* Name */
                    nameRef.current = data.name;
    
                    /* Geographical data */
                    cityRef.current = data.city;
                    addressRef.current = data.address;
                    postalRef.current = data.postal_code;
    
                    /* Other data */
                    establishmentRef.current = data.year_establishment;
                    //businessDescriptionRef.current = data.business_description;
                    setBussinesDescription(data.business_description);
                    
                    const data_dict = {
                        'mode':'edit',                    
                        'country':data.country,
                        'continent':data.continent_display,
                        'region':data.region_display,
                        'industry':data.industry_id,
                        'supersector':data.supersector_id,
                        'sector':data.sector_id,
                        'subsector':data.subsector,                    
                        'export':data.year_first_expo                    
                    }
    
                    companyData.current = data_dict;    
                    setCompanyDataState(data_dict);

                    console.log("data dict: ", data_dict);

                    if (data_dict.export === 0) {
                        setCheckedState(true);
                        setDisabledState('disabled');            
                    } else {
                        setCheckedState(false);
                        setDisabledState('false');
                        setYearFirstExport(data_dict.export);
                    }            

                })
        }        
    }, [location.state.id, location.state.mode]);
        
                
    /* Modified the data of the company in order to match the data the API needs to validate it */
    function modifiedData(data, user) {
        data['user_creator'] = user.id;

        if (data['address'] === '') {
            data['address'] = 'None';
        };

        if (data['postal_code'] === '') {
            data['postal_code'] = '---';
        };

        if (data['city'] === '') {
            data['city'] = 'None';
        };

        if (data['year_establishment'] === '') {
            data['year_establishment'] = 0;
        };

        if (data['year_first_expo'] === '') {
            data['year_first_expo'] = 0;
        };

        if (data['business_description'] === '') {
            data['business_description'] = 'None';
        };
    }


    /* Handle click to handle click in the component CreateEditBar to edit or create a company */
    function handleClick() {        
        const data = getNames();
        const user = getUser();

        modifiedData(data, user);
        

        /* Axios */
        if (modeRef.current === 'Create') {
            axiosService
                .post("/company/", data)
                .then((res) => {                
                    companyMessageTimeout('Company succesfully created');
                    companyResetAfterCreate();

                    // Reset geographical data
                    selectRef.current.value = countries[0].id
                    setContinent(countries[0].continent)
                    setRegion(countries[0].region)

                    // Reset industy data
                    selectIndustryRef.current.value = 1;
                    const id_industry = selectIndustryRef.current.value;
                    const position = id_industry - 1; 

                    const lstSupersector = fcnGenerateData('supersector', 'industry', position);
                    setSuperSector(lstSupersector);

                    const lstSector = fcnGenerateData('sector', 'supersector', position, lstSupersector);
                    setSector(lstSector);

                    const lstSubsector = fcnGenerateData('subsector', 'sector', position, lstSector);
                    setSubSector(lstSubsector);   

                    // Reset other fields
                    setCheckedState(true);
                    setBussinesDescription("")
                    setDisabledState('disabled')
                    
                    window.scrollTo(0, 0);
                })
                .catch((error) => {
                    console.log("Error: " + error);
                    navigate("/")
                });

        // if it is edit
        } else {            
            axiosService
                .put(`/company/${location.state.id}/`, data)
                .then(res => res.data)
                .then((data) => {
                    companyMessageTimeout('Company succesfully edited');
                    window.scrollTo(0, 0)
                })                    
                .catch((error) => {
                    console.log("Error: " + error);
                    navigate("/")
                })
        }

    }


    /* List of countries */
    useEffect(() => {        
        axiosService
            .get(`/countries`)
            .then(res => res.data)
            .then((data) => {
                setCountries([...data]);

                if (companyDataState.mode === 'edit') {
                    selectRef.current.value = companyDataState.country;
                    setContinent(companyData.current.continent);
                    setRegion(companyData.current.region);

                } else {                    
                    setContinent(data[0].continent)
                    setRegion(data[0].region)
                }                    
            })
            .catch((error) => {
                console.log("Error: " + error);
                navigate("/")
            })     
    }, [companyDataState, navigate]);

    
    /* Fill the array with the data to be put in the respective useState to populate the select. */
    function fcnGenerateData(typeOfIndustry, upperType, position, upperTypeArray) {
        let tempArray = [];
        let id;

        // If it is supersector, I have to use the industry array that is a useRef.
        if (typeOfIndustry === 'supersector') {
            id = industry.current[position].id;

        } else {
            id = upperTypeArray[0].id;
        }        

        industry.current[position][`${typeOfIndustry}`].forEach(function(item) {
            if (parseInt(item[`${upperType}`]) === parseInt(id)) {
                tempArray.push(item);
            }                            
        })

        return tempArray;
    }

    
    /* List of industries */
    useEffect(() => {
        axiosService
            .get(`/industry`)
            .then(res => res.data)
            .then((data) => {
                industry.current = [...data];

                let lstSupersector = [];
                let lstSector = [];
                let lstSubsector = [];
                let position = 0;
                let industry_id = data[0].id;
                let supersector_id, sector_id;

                if (companyDataState.mode === 'edit') {
                    industry_id = companyDataState.industry;
                    selectIndustryRef.current.value = industry_id;
                    position = industry_id - 1;
                } 

                /* To fetch all supersectors related to the current industry */
                data[position].supersector.forEach(function(item) {
                    if (item.industry === industry_id) {
                        lstSupersector.push(item);
                    }
                })

                setSuperSector(lstSupersector);

                /* To fetch all sectors related to the current supersector */
                if (location.state.mode === 'Edit') {                    
                    supersector_id = companyData.current.supersector;
                } else {
                    supersector_id = lstSupersector[0].id;
                };

                data[position].sector.forEach(function(item) {
                    if (item.supersector === supersector_id) {
                        lstSector.push(item);
                    }
                })

                setSector(lstSector);
                

                /* To fetch all subsectors related to the current sector */
                if (location.state.mode === 'Edit') {                    
                    sector_id = companyData.current.sector;
                } else {
                    sector_id = lstSector[0].id;
                };
                

                data[position].subsector.forEach(function(item) {
                    if (item.sector === sector_id) {
                        lstSubsector.push(item);
                    }
                })

                setSubSector(lstSubsector);

                if (location.state.mode === 'Edit') {
                    selectSupersectorRef.current.value = companyData.current.supersector;
                    selectSectorRef.current.value = companyData.current.sector;
                    selectSubsectorRef.current.value = companyData.current.subsector;
                }
            
            })
            .catch((error) => {
                console.log("Error: " + error);
                navigate("/")
            })
    }, [companyDataState, location.state.mode, navigate]);


    /* Select on change country - Every time the user change the country in the select */
    function handleOnChange() {
        const country = countries.find(x => parseInt(x.id) === parseInt(selectRef.current.value));
        
        setContinent(country.continent);
        setRegion(country.region);
    }

    
    /* Select on change for the changes in the industry related selectors */
    function fcnHandleOnChangeIndustry(id) {        
        const id_industry = id;
        const position = id_industry - 1;        

        const lstSupersector = fcnGenerateData('supersector', 'industry', position);
        setSuperSector(lstSupersector);

        const lstSector = fcnGenerateData('sector', 'supersector', position, lstSupersector);
        setSector(lstSector);

        const lstSubsector = fcnGenerateData('subsector', 'sector', position, lstSector);
        setSubSector(lstSubsector);        
    }

    function handleOnChangeIndustry() {
        fcnHandleOnChangeIndustry(selectIndustryRef.current.value);
    }

    function handleOnChangeSupersector() {
        const id = selectSupersectorRef.current.value;
        const position = selectIndustryRef.current.value - 1;
        const lstId = [{'id':id}];
        
        const lstSector = fcnGenerateData('sector', 'supersector', position, lstId);
        setSector(lstSector);        

        const lstSubsector = fcnGenerateData('subsector', 'sector', position, lstSector);
        setSubSector(lstSubsector);
    }

    function handleOnChangeSector() {
        const id = selectSectorRef.current.value;
        const position = selectIndustryRef.current.value - 1;
        const lstId = [{'id':id}];
        
        const lstSubsector = fcnGenerateData('subsector', 'sector', position, lstId);
        setSubSector(lstSubsector);        
    }
    

    /* Handle the max number of characters for an input number */
    function handleMaxInput(e) {
        if ((e.target.value).length > 4) {
            e.target.value = e.target.value.slice(0, 4);
        }
    }


    /* If check is clicked, the input number will be disabled */
    function handleCheckClick(e) {
        setCheckedState(!checkedState);

        if (checkedState) {            
            setDisabledState('');            

        } else {            
            setDisabledState('disabled');
            setYearFirstExport('');
        }       
    }    



    /* Return */
    return (
        <>
            <CreateEditBar
                mode={modeRef.current}
                handleClick={handleClick}
            />


            {/* Title */}
            <div id="divInitialTitle">
                <h3>{titleRef.current}</h3>
            </div>


            {/* Company name */}
            <div className="mainDivs" id="divCompanyName">
                <label htmlFor="txtCompanyName">Company<br/>name</label>
                <textarea
                    className="name" 
                    placeholder="Company name" 
                    id="txtCompanyName"
                    value={nameRef.current}
                ></textarea>
            </div>


            {/* Geographic data */}
            <div className="mainDivs" id="divGeographicData">
                <h3>Geographical data</h3>

                <div>
                    <label>City</label>
                    <textarea 
                        placeholder="City" 
                        id="txtCity" 
                        className="name"
                        value={cityRef.current}
                    ></textarea>
                </div>

                <div>
                    <label>Postal<br/>code</label>
                    <textarea 
                        placeholder="Postal code" 
                        id="txtPostalCode" 
                        className="name"
                        value={postalRef.current}
                    ></textarea>
                </div>

                <div>
                    <label>Address</label>
                    <textarea 
                        placeholder="Address" 
                        id="txtAddress" 
                        className="name"
                        value={addressRef.current}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="selectCountry">Country</label>
                    <select 
                        className="name companySelects" 
                        ref={selectRef} 
                        id="selectCountry" 
                        onChange={handleOnChange}                        
                    >
                        {countries?.map((element, index) => (                            
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label>Continent</label>
                    <label className="name">{continent}</label>
                </div>
                    
                <div>
                    <label>Region</label>
                    <label className="name">{region}</label>
                </div>                                    
            </div>


            {/* Industries */}
            <div className="mainDivs" id="divCompanyIndustry">
                <h3>Industry</h3>

                <div id="divCompanySelectIndustry">
                    <label htmlFor="selectIndustry">Industry</label>
                    <label htmlFor="selectSupersector">Supersector</label>
                    
                    <select 
                        className="name companySelects" 
                        ref={selectIndustryRef} 
                        id="selectIndustry" 
                        onChange={handleOnChangeIndustry}                        
                    >
                        {industry.current.map((element, index) => (
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>

                    <select 
                        className="name companySelects" 
                        ref={selectSupersectorRef} 
                        id="selectSupersector" 
                        onChange={handleOnChangeSupersector}                        
                    >
                        {superSector?.map((element, index) => {                                                        
                            return <option key={element.id} value={element.id}>{element.name}</option>
                        })}
                    </select>

                    <label htmlFor="selectSector">Sector</label>
                    <label htmlFor="selectSubsector">Subsector</label>

                    <select 
                        className="name companySelects" 
                        ref={selectSectorRef} 
                        id="selectSector" 
                        onChange={handleOnChangeSector}                        
                    >
                        {sector?.map((element, index) => (
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>

                    <select 
                        className="name companySelects" 
                        ref={selectSubsectorRef} 
                        id="selectSubsector"
                    >
                        {subSector?.map((element, index) => (
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>
                </div>                
            </div>


            {/* Other data */}
            <div className="mainDivs" id="divCompanyOtherData">
                <div>                    
                    <label htmlFor="companyEstablishmet">Year of<br/>establishment</label>
                    <label htmlFor="chkCompanyNotApplicable">Whitout<br/>exports</label>
                    <label htmlFor="companyFirstExport">Year of<br/>first export</label>

                    <input 
                        className="name" 
                        value={establishmentRef.current}
                        onChange={handleMaxInput} 
                        id="companyEstablishmet" 
                        type="number"                        
                    />
                    
                    <input                         
                        className="name"
                        ref={withoutExport}
                        onChange={handleCheckClick} 
                        type="checkbox" 
                        id="chkCompanyNotApplicable"
                        checked={checkedState}
                    />

                    <input 
                        className="name"        
                        ref={yearFirstExpoRef}                 
                        disabled={disabledState}
                        value={yearFirstExport} 
                        onChange={handleMaxInput}
                        id="companyFirstExport" 
                        type="number"                         
                    />
                </div>

                <div>
                    <label htmlFor="">Business<br/>description</label>
                    <textarea 
                        className="name" 
                        maxLength={250} 
                        placeholder="Business description"                        
                        value={bussinesDescription}
                        onInput={(e) => setBussinesDescription(e.target.value)}
                    ></textarea>
                </div>                
            </div>
        </>
    )
}
