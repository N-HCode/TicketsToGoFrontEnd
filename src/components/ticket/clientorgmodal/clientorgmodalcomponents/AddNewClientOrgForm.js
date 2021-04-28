import React, {useState} from 'react';
import {addClientOrg} from '../../../../services/ClientOrgService';


const AddNewClientOrgForm = () => {

    const [clientOrgInfoState, setClientOrgInfoState] = useState(
        {
            isForeignAddress: false,
            city: null,
            state: null,
            streetAddress: null,
            zipcode: null,
            country: null,
            organizationName: null,
            organizationPhoneNumber: null,
        }
        
    )

    const onChangeCheckBox = (e) => {

        //We use the .checked for checkboxes to get true or false on whether it is checked
        setClientOrgInfoState({
            ...clientOrgInfoState,
            [e.target.name]: e.target.checked
        });
    }

    const onChange = (e) => {
        setClientOrgInfoState({
            ...clientOrgInfoState,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        try {

            await addClientOrg(clientOrgInfoState);


            //reset information
            setClientOrgInfoState( 
            {
                isForeignAddress: false,
                city: null,
                state: null,
                streetAddress: null,
                zipcode: null,
                country: null,
                organizationName: null,
                organizationPhoneNumber: null,
            })

            console.log(clientOrgInfoState);

    
            
        } catch (error) {
            
        }
    }



    return (
        <form className="form_modal" id="client_org_modal_create" onSubmit={onSubmit}>
            <div>
                <label htmlFor="isForeignAddress">Foreign Address:</label>
                <input  type="checkbox" name="isForeignAddress" onChange={onChangeCheckBox}></input>

            </div>

            <label htmlFor="organizationName">Organization Name:</label>
            <input  type="text" required name="organizationName"  value={clientOrgInfoState.organizationName || ""} onChange={onChange}></input>


            <label htmlFor="city">City:</label>
            <input  type="text" required name="city" value={clientOrgInfoState.city || ""} onChange={onChange}></input>

            <label htmlFor="state">State:</label>
            <input  type="text" required name="state" value={clientOrgInfoState.state || ""} onChange={onChange}></input>

            <label htmlFor="streetAddress">Address:</label>
            <input  type="text" required name="streetAddress" value={clientOrgInfoState.streetAddress || ""} onChange={onChange}></input>

            <label htmlFor="zipcode">Zipcode:</label>
            <input  type="text" required name="zipcode" value={clientOrgInfoState.zipcode || ""} onChange={onChange}></input>

            <label htmlFor="country">Country:</label>
            <input  type="text" required name="country" value={clientOrgInfoState.country || ""} onChange={onChange}></input>

            <label htmlFor="organizationPhoneNumber">Phone # (Optional):</label>
            <input  type="text" name="organizationPhoneNumber" value={clientOrgInfoState.organizationPhoneNumber || ""} onChange={onChange}></input>

            <div className="client_org_modal_button form_submit_button">
                <button form="client_org_modal_create"> Create</button>
            </div>
  
        </form>
    )
}

export default AddNewClientOrgForm
