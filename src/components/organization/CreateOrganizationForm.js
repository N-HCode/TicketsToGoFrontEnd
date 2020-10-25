import React, { useState, useEffect } from 'react'
import { CreateOrganiaiton, createOrganization } from '../../services/OrganizationService'

const CreateOrganizationForm = (props) => {
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

    const onChange = (e) => {
        setOrganization({
            ...organization,
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
        console.log(props.user)
        createOrganization(organization)
        .then(response => console.log(response.data))
        .then()
    }

    const checkState = (e) => {
        e.preventDefault()
        console.log(organization)
    }

    return (
        <form >
            <div className="form-container">
                <h1>Create Organization</h1>
                <p>Please fill in this form to register your organization.</p>
                <h4>Currently not implmented yet</h4>
                <hr></hr>

                <label htmlFor="name">Organization Name</label>
                <input type="text" name="organizationName" onChange={onChange} required ></input>

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
                      <input type="text" name="city" onChange={onChange} required ></input>
  
                      <label htmlFor="state">State</label>
                      <input type="text" name="state" onChange={onChange} required ></input>
  
                      <label htmlFor="street">Street Address</label>
                      <input type="text" name="streetAddress" onChange={onChange} required ></input>
  
                      <label htmlFor="zip">ZipCode</label>
                      <input type="text" name="zipcode" onChange={onChange} required ></input>

                      <label htmlFor="country">Country</label>
                      <select name="country" onChange={onChange}> 
                        <option value="United States of America">United States of America</option>
                      </select>
  
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" name="organizationPhoneNumber" pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="1-800-333-3333" onChange={onChange} required ></input>
                    </div>
                }
                
                <button onClick={onSubmit}>Create Organization</button>
                <button onClick={checkState}>check State</button>
            </div>
        </form>
    )
}

export default CreateOrganizationForm
