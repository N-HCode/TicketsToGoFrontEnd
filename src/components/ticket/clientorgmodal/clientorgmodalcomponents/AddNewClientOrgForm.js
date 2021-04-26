import React, {useState} from 'react'

const AddNewClientOrgForm = () => {

    const [clientOrgInfoState, setClientOrgInfoState] = useState(
        {
            isForeignAddress: null,
            city: null,
            state: null,
            streetAddress: null,
            zipcode: null,
            country: null,
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



    return (
        <div className="form_modal"


        >
            <div>
                <label htmlFor="isForeignAddress">Foreign Address?:</label>
                <input  type="checkbox" required name="isForeignAddress" onChange={onChangeCheckBox}></input>

            </div>


            <label htmlFor="city">City:</label>
            <input  type="text" required name="city" onChange={onChange}></input>

            <label htmlFor="state">State:</label>
            <input  type="text" required name="state" onChange={onChange}></input>

            <label htmlFor="streetAddress">Address:</label>
            <input  type="text" required name="streetAddress" onChange={onChange}></input>

            <label htmlFor="zipcode">Zipcode:</label>
            <input  type="text" required name="zipcode" onChange={onChange}></input>

            <label htmlFor="country">Country:</label>
            <input  type="text" required name="country" onChange={onChange}></input>

            <label htmlFor="organizationPhoneNumber">Phone # (Optional):</label>
            <input  type="text" name="organizationPhoneNumber" onChange={onChange}></input>
  
        </div>
    )
}

export default AddNewClientOrgForm
