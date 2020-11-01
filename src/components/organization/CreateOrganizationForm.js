import React, { useState } from 'react';
import { createOrganization } from '../../services/OrganizationService';
import OrgInfoInput from './signupcomponents/OrgInfoInput';
import AccountInfoInput from './signupcomponents/AccountInfoInput';

const CreateOrganizationForm = (props) => {

    const [ root, setRoot ] = useState({
        username: "",
        password: ""
    })

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

    const onSubmit = (e) => {
        e.preventDefault();
        createOrganization(root.username, root.password, organization)
        .then(response => console.log(response.data))
    }

    return (
        <form onSubmit={onSubmit}>

            <div className="step_container">
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
            </div>
            <div>
             <div id="setup_hidden_container">
            <div className="input_signup_container">
                <div >


                    <OrgInfoInput/>

                </div>
                    <AccountInfoInput />    

               </div>
               </div> 
            </div>
        </form>
    )
}

export default CreateOrganizationForm
