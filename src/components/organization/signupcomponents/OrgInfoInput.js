import React from 'react'


const OrgInfoInput = (props) => {

    const onChangeOrganization = (e) => {
        props.setOrganization({
            ...props.organization,
            [e.target.name]: e.target.value
        })
    }

    var signupForm;
    var stepDoc;
    const continueToNext = (e) => {
        //form submit by defaults refreshes the page.
        //This precent default will prevent that from
        e.preventDefault();
        if (signupForm === undefined) {
            signupForm = document.getElementsByClassName("input_signup_container")[0];
        }
        signupForm.style.transform = "translateX(-340px)";


        //This section is to change the step that is active on top
        //This if is in place so that if they are in the same page and going back and forth
        //Only need to getElement by Id once. Hopefully increasing performance
        if (stepDoc === undefined) {
            stepDoc = document.getElementById("step_container");
        }

        let newActiveIndex;
        for (let i = 0; i < stepDoc.children.length; i++) {
            let stepChild = stepDoc.children[i];
            if (stepChild.classList.contains("step_active")) {
                stepChild.classList.remove("step_active");
                newActiveIndex = i+1;
                break;
            }
        }

        if (newActiveIndex < stepDoc.children.length) {
            stepDoc.children[newActiveIndex].classList.add("step_active")
        }

    }


    return (
        <form id="first_step_signup" onSubmit={continueToNext}>
            <h1>Create Organization</h1>
            <p>Please fill in this form to register your organization.</p>
            <hr></hr>

            <label htmlFor="name">Organization Name</label>
            <input type="text" name="organizationName" onChange={onChangeOrganization} required ></input>

            <label htmlFor="foreign">Foreign Address?</label>
            <select name="isForeignAddress" >  
                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            
            { props.organization.isForeignAddress ? 
                <div>
                    Foreign Address Form
                </div>
                : 
                <div className="signup_address">

            
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
            
                    {/* By defualt a button in a form will have a type of submit. Will need to change the button type
                    so it does not submit */}
                    <button id="first_step_button">Continue</button>

                </div>
            }

            
        </form>
    )
}

export default OrgInfoInput
