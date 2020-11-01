import React, { useState } from 'react';
import { createOrganization } from '../../services/OrganizationService';
import OrgInfoInput from './signupcomponents/OrgInfoInput';
import AccountInfoInput from './signupcomponents/AccountInfoInput';

const CreateOrganizationForm = (props) => {

    //We keep the organization information up in here because it needs to be passed
    //down into two forms.
    const [ organization, setOrganization]= useState({
        organizationName: "",
        isForeignAddress: false,
        city: "",
        state: "",
        streetAddress: "",
        zipcode: "",
        country: "United States of America",
        organizationPhoneNumber: ""
    })



    return (
        <div >

            <div className="step_container">
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
            </div>

            <div>
                <div id="setup_hidden_container">
                    <div className="input_signup_container">
                
                        {/* We just pass down the state and it will just use a reference
                        instead of creating a copy*/}
                        <OrgInfoInput  
                        organization={organization}
                        setOrganization={setOrganization}
                        />

                        {/* This is the final form. So we pass down on the information into it
                        Then it can call the service on submit */}
                        <AccountInfoInput organization={organization}/>    

                    </div>
                </div> 
            </div>
        </div>
    )
}

export default CreateOrganizationForm
