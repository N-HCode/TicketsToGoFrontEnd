import React, { useState } from 'react';
import { createOrganization } from '../../../services/OrganizationService';
// https://reactrouter.com/web/api/Hooks/usehistory
import { useHistory } from "react-router-dom";
import { ERROR } from '../../constants/Error';



const AccountInfoInput =(props) => {

    const [ root, setRoot ] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState({
        exist: false,
        errorMessage: null

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

        setError({
            exist: false,
            errorMessage: null
        })

        
        if(root.password !== root.confirmPassword){
            //use set timeout so it had time to update the clearing so that it shakes again
            setTimeout(() => setError({
                exist: true,
                errorMessage: ERROR.confirmPW
            }), 0)
            return
        }else{
            try {
                const response = await createOrganization(root.username, root.password, props.organization)
                console.log(response);
                setError({
                    exist: false,
                    errorMessage: null
                })
                history.push("/login")
            } catch (error) {
                alert(error)
            }
        }


        

    }

    
    return (
        <form id="second_step_signup" onSubmit={onSubmit}> 
            <div className="go_back"onClick={goBack}>
                <i className="material-icons" >keyboard_backspace</i> 
            </div>
             
            <h1>Create Admin</h1>
            <p>This will be your initial admin account with full access</p>
            <hr></hr>

            {error.exist && <div className="error_message"><p>{error.errorMessage}</p></div>}
            

            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={onChangeRoot} required></input>

            <label htmlFor="password">Password</label>
            <input type="text" name="password" onChange={onChangeRoot} required></input>

            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="text" name="confirmPassword" onChange={onChangeRoot} required></input>
            
            <button type="submit">Complete</button>

            
        </form>
    )
}

export default AccountInfoInput
