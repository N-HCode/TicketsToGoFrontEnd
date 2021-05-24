import React, {useState, useContext} from 'react';
import {createContact} from '../../../../services/ContactService';
import {SelectedOrgContext} from '../../../context/SelectedOrgContext';

const AddNewContactForm = () => {

    //Need to put the [] otherwise it will give an array with the dispatch in it too.
    const [selectedOrgContext] = useContext(SelectedOrgContext)

    const [contactState, setContactState] = useState(
        {
            firstName: null,
            lastName: null,
            fullName: null,
            email: null,
            phoneNumber: null
        }
        
    )

    const onChange = (e) => {
        setContactState({
            ...contactState,
            [e.target.name]: e.target.value,
            fullName: contactState.firstName + " " + contactState.lastName
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            await createContact(selectedOrgContext.id, contactState);

            setContactState(
                {
                    firstName: null,
                    lastName: null,
                    fullName: null,
                    email: null,
                    phoneNumber: null
                }

            )


            
        } catch (error) {
            
        }

        

    }


    return (
        <form className="form_modal" onSubmit={onSubmit}>

            <label htmlFor="firstName">First Name:</label>
            <input  type="text" required name="firstName"  value={contactState.firstName || ""} onChange={onChange}></input>

            <label htmlFor="lastName">Last Name:</label>
            <input  type="text" required name="lastName"  value={contactState.lastName || ""} onChange={onChange}></input>

            <label htmlFor="email">Email:</label>
            <input  type="text" required name="email"  value={contactState.email || ""} onChange={onChange}></input>

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input  type="text" required name="phoneNumber"  value={contactState.phoneNumber || ""} onChange={onChange}></input>

            <div className="client_org_modal_button form_submit_button">
                <button> Create</button>
            </div>
            
        </form>
    )
}

export default AddNewContactForm
