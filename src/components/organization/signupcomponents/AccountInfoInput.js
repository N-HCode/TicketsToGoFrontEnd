import React, { useState } from 'react';
import { createOrganization } from '../../../services/OrganizationService';
// https://reactrouter.com/web/api/Hooks/usehistory
import { useHistory } from "react-router-dom";



const AccountInfoInput =(props) => {

    const [ root, setRoot ] = useState({
        username: "",
        password: ""
    })

    const history = useHistory();

    var signupForm;
    var stepDoc;
    const goBack = () =>{
        if (signupForm == undefined) {
            signupForm = document.getElementsByClassName("input_signup_container")[0];
        }
        signupForm.style.transform = "translateX(0px)";

        if (stepDoc === undefined) {
            stepDoc = document.getElementById("step_container");
        }

        let newActiveIndex;
        for (let i = 0; i < stepDoc.children.length; i++) {
            let stepChild = stepDoc.children[i];
            if (stepChild.classList.contains("step_active")) {
                stepChild.classList.remove("step_active");
                newActiveIndex = i-1;
                break;
            }
        }

        if (newActiveIndex >= 0) {
            stepDoc.children[newActiveIndex].classList.add("step_active")
        }

    }

    const onChangeRoot = (e) => {
        setRoot({
            ...root,
            [e.target.name]: e.target.value
        })
    }

    

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createOrganization(root.username, root.password, props.organization)
            console.log(response);
            history.push("/login")
        } catch (error) {
            alert(error)
        }
        

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
