import React, { useState } from 'react';
import { createOrganization } from '../../../services/OrganizationService';



function AccountInfoInput(props) {

    const [ root, setRoot ] = useState({
        username: "",
        password: ""
    })

    var signupForm;
    const goBack = () =>{
        if (signupForm == undefined) {
            signupForm = document.getElementsByClassName("input_signup_container")[0];
        }
        signupForm.style.transform = "translateX(0px)";
    }

    const onChangeRoot = (e) => {
        setRoot({
            ...root,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createOrganization(root.username, root.password, props.organization)
        .then(response => console.log(response.data))
    }

    
    return (
        <form id="second_step_signup" onSubmit={onSubmit}> 
            <div onClick={goBack}>
                <i className="material-icons" >keyboard_backspace</i> 
            </div>
             
            <h1>Create Admin</h1>
            <p>This will be your initial admin account with full access</p>
            <hr></hr>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={onChangeRoot} required></input>

            <label htmlFor="password">Password</label>
            <input type="text" name="password" onChange={onChangeRoot} required></input>
            
            <button type="submit">Complete</button>

            
        </form>
    )
}

export default AccountInfoInput
