import React, { useState } from 'react'
import { createOrganization } from '../../services/OrganizationService'

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

    const onChangeOrganization = (e) => {
        setOrganization({
            ...organization,
            [e.target.name]: e.target.value
        })
    }

    const onChangeRoot = (e) => {
        setRoot({
            ...root,
            [e.target.name]: e.target.value
        })
    }

    const formChange = (e) => {
        let foreignAddressValue = e.target.value;
        let toBoolean = (foreignAddressValue === "true"); 

        setOrganization({
            ...organization,
            [e.target.name]: toBoolean
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createOrganization(root.username, root.password, organization)
        .then(response => console.log(response.data))
    }

    const checkState = (e) => {
        e.preventDefault()
        console.log(organization)
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
                <div id="first_step_signup">
                    <h1>Create Organization</h1>
                    <p>Please fill in this form to register your organization.</p>
                    <hr></hr>

                    <label htmlFor="name">Organization Name</label>
                    <input type="text" name="organizationName" onChange={onChangeOrganization} required ></input>

                    <label htmlFor="foreign">Foreign Address?</label>
                    <select name="isForeignAddress" onChange={formChange}> 
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                    
                    { organization.isForeignAddress ? 
                        <div>
                            Foreign Address Form
                        </div>
                        : 
                        <div>

                    
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" onChange={onChangeOrganization} required ></input>
        
                            <label htmlFor="state">State</label>
                            <input type="text" name="state" onChange={onChangeOrganization} required ></input>

                            <label htmlFor="country">Country</label>
                            <select name="country" onChange={onChangeOrganization}> 
                                <option value="United States of America">United States</option>
                            </select>

                            <br></br>
        
                            <label htmlFor="street">Street Address</label>
                            <input type="text" name="streetAddress" onChange={onChangeOrganization} required ></input>
        
                            <label htmlFor="zip">ZipCode</label>
                            <input type="text" name="zipcode" onChange={onChangeOrganization} required ></input>


        
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" name="organizationPhoneNumber" pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="1-800-333-3333" onChange={onChangeOrganization} required ></input>
                    

                        </div>
                    }

                    <button>Button</button>
                </div>
                
                    <div id="second_step_signup">  
                        <h1>Create Admin</h1>
                        <p>This will be your inital admin account with full access</p>
                        <hr></hr>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={onChangeRoot} required></input>

                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={onChangeRoot} required></input>
                    
                    <button type="submit">Create Organization</button>
                    </div>  
               </div>
               </div> 
            </div>
        </form>
    )
}

export default CreateOrganizationForm
