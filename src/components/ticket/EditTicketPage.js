import userEvent from '@testing-library/user-event';
import React from 'react'

// useHistory method for redirecting back to pages
import { useHistory } from 'react-router-dom'

// Going to do an api call based on the param passed in the url 
// to get data back and then populate state that way to
// trickle down to the fields and implement a on-change and save button to submit the form
const EditTicketPage = () => {
    const history = useHistory();

    // the method that runs when the save button is hit
    const handleSave = () => {
        // {ask if they are sure they want to save}
        let confirm = window.confirm("Are you sure you want to submit your changes?");

        // if they do call api here and edit the ticket and then redirect
        if( confirm ){
            alert("success")
            history.push("/")
        }else{
            return;
        }
    }

    return (
        <div>
            This is the editing ticket page
            {/* {for subject} */}
            <form>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input  type="text" required name="subject"></input>
                </div>

                {/* {for description} */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows="3" cols="40"></textarea>
                </div>

                {/* {for priority} */}
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="escalate">Escalate</option>
                    </select>
                </div>
                
                {/* {button for submitting the form } */}
                <button type="submit" onClick={handleSave}>Save</button>
            </form>

         
        </div>
    )
}

export default EditTicketPage

    
    
   