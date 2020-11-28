import React from 'react';
import Modal from 'react-modal';

const AdminAddUser = ({IsOpen, cancelAddUser, onChange, shake, setShake, error, addUser, confirmPassword}) => {
    return (
        <Modal 
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={IsOpen} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={cancelAddUser}>


            <form onSubmit={addUser}>
                <h2>Add User</h2>
                <p className="sub_title_text">Add in details to create a new user</p>
                <hr></hr>

                { error.exist && 
            
                // this is how you do animiation. You use a useState and then add the class in
                <div className={shake? "error_message shake" : "error_message" }
                    onAnimationEnd={() => setShake(false)}
                >
                    <p>{error.errorMessage}</p>
                </div>
                
                }

                <div className="modal_form_inputs">

                    {/* <button type="button" onClick={check}>check</button> */}
                    <div className="modal_column">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" required onChange={onChange}></input>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" required onChange={onChange}></input>

                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required onChange={onChange}></input>

                        <label htmlFor="phoneNumber">PhoneNumber (Opt)</label>
                        <input type="text" name="phoneNumber" 
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        onChange={onChange}></input>
                    </div>

                    <div className="modal_column">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required onChange={onChange}></input>

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required onChange={onChange}></input>

                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="password" required ref={confirmPassword}></input>


                        {/* if option value is "" it will cause a validation error if the 
                        required tagged is there. */}
                        <label htmlFor="userRole">User Role:</label>
                        <select name="userRole" onChange={onChange} required>
                            <option value="" disabled selected>Select Role...</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                </div>    

                <div className="modal_btn">
                    {/* this creates a reset button that will rest all the values
                    in the form */}
                    {/* <input type="reset" value="reset"/> */}

                    <button type="button" onClick={cancelAddUser}>Cancel</button>
                    <button>Add User</button>
                </div>    
            </form>

        </Modal>
    )
}

export default AdminAddUser
