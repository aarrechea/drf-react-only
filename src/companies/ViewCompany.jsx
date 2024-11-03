/* Imports */
import "./css/viewCompany.css"
import moment from 'moment';



/* View components */
const ViewCompany = ({showViewCompany, setShowViewCompany, companyObject}) => {
    let year_fist_expo = companyObject?.year_first_expo;
    

    if (companyObject?.year_first_expo === 0) {
        year_fist_expo = 'No exports yet';
    }    

    const created = moment(companyObject?.created).format('DD/MM/YYYY');
    const updated = moment(companyObject?.updated).format('DD/MM/YYYY');
    
    

    /* Return */
    return (        
        <div id="divCompanyView" style={{display:showViewCompany}}>
            <div id="divCompanyViewMain">
                <div id="divCompanyViewName">
                    <label>Company<br/>name</label>
                    <textarea disabled cols={2} value={companyObject?.name}></textarea>
                </div>

                <div id="divCompanyViewGeo">
                    <div>
                        <label htmlFor="">Country</label>
                        <input disabled type="text" value={companyObject?.country_display} />

                        <label htmlFor="">City</label>
                        <input disabled type="text" value={companyObject?.city} />

                        <label htmlFor="">Postal code</label>
                        <input disabled id="inputPostalCode" type="text" value={companyObject?.postal_code} />
                    </div>
                    
                    <div>
                        <label htmlFor="">Address</label>
                        <input disabled type="text" value={companyObject?.address} />
                    </div>                    
                </div>

                <div id="divCompanyViewIndustry">
                    <label>Industry</label>
                    <input disabled type="text" value={companyObject?.industry_display} />

                    <label>Supersector</label>
                    <input disabled type="text" value={companyObject?.supersector_display} />

                    <label>Sector</label>
                    <input disabled type="text" value={companyObject?.sector_display} />

                    <label>Subsector</label>
                    <input disabled type="text" value={companyObject?.subsector_display} />

                </div>

                <div id="divCompanyViewOtherData">
                    <label>Year of establishment</label>
                    <input disabled type="text" value={companyObject?.year_establishment} />
                    
                    <label>Evaluations made</label>
                    <input disabled type="text" value={companyObject?.eva_made} />

                    <label>Created</label>
                    <input disabled type="text" value={created} />

                    <label>Year of first export</label>
                    <input disabled type="text" value={year_fist_expo} />
                    
                    <label>Evaluation in progress</label>
                    <input disabled type="text" value={companyObject?.eva_progress} />

                    <label>Updated</label>
                    <input disabled type="text" value={updated} />
                </div>

                <div id="divCompanyViewBusiness">
                    <label>Business<br/>description</label>
                    <textarea disabled value={companyObject?.business_description}></textarea>
                </div>
                                
                <div id="divCompanyViewButton">
                    <button onClick={() => setShowViewCompany('none')}>Close</button>
                </div>                
            </div>
        </div>        
    )
}



/* Export */
export default ViewCompany;



