import React, {useContext, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { editUser } from '../../services/UserService';

const EditUserPage = (props) => {

    const [ user, setUser ] = useContext(UserContext);
    const [ userCopy, setUserCopy] = useState(props.location.state.user);
  

    const onChange = (e) => {

        setUserCopy({
            ...userCopy,
            [e.target.name]: e.target.value        
        })

    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await editUser(userCopy.userId, userCopy)
            // .then(props.history.push("/"))
            .then(response => setUser(response.data))
            .then(alert("save"))
            .catch(error => 
                alert(error.message)
            )
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="Name">Name</label>
                <input value={userCopy.firstName} 
                name="firstName"
                onChange={onChange}
                ></input>

                <label htmlFor="Role">Role</label>
                <input value={userCopy.userRole} name="userRole" onChange={onChange}></input>

                <button type="submit">SAVE</button>
                
            </div>
        </form>
    )
}

export default EditUserPage
