import React, { useState, useEffect } from 'react'

const CreateOrganizationForm = () => {
    const [ organization, setOrganization]= useState({
        organizationName: "",
        isForeignAddress: false,
        city: "",
        state: "",
        streetAddress: "",
        zipcode: "",
        country: "",
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

    return (
        <form>
            <div className="form-container">
                <h1>Create Organization</h1>
                <p>Please fill in this form to register your organization.</p>
                <h4>Currently not implmented yet</h4>
                <hr></hr>

                <label htmlFor="name">Organization Name</label>
                <input type="text" onChange={onChange} ></input>

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
                      <input type="text" onChange={onChange}></input>
  
                      <label htmlFor="state">State</label>
                      <input type="text" onChange={onChange}></input>
  
                      <label htmlFor="street">Street Address</label>
                      <input type="text" onChange={onChange}></input>
  
                      <label htmlFor="zip">ZipCode</label>
                      <input type="text" onChange={onChange}></input>
  
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" pattern="[0-9][1]-[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="1-800-333-3333" onChange={onChange}></input>
                    </div>
                }
                
                <button type="submit">Create Organization</button>
            </div>
        </form>
    )
}

export default CreateOrganizationForm
