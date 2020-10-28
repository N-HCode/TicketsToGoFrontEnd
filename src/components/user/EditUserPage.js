import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { editUser } from '../../services/UserService'

const EditUserPage = (props) => {

    const [ user, setUser ] = useContext(UserContext);
    const ifFailed = Object.assign({}, user);
 
    const onChange = (e) => {

        setUser({
                ...user,
                details:{
                    ...user.details,
                    [e.target.name]: e.target.value}
                
        })

    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await editUser(user.details.userId, user.details)
            .then(alert("save"))
            .then(props.history.push("/"))
            .catch((error) => { setUser(ifFailed); alert(error.message)})
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="Name">Name</label>
                <input value={user.details.firstName} 
                name="firstName"
                onChange={onChange}
                ></input>

                <label htmlFor="Role">Role</label>
                <input value={user.details.userRole} name="userRole" onChange={onChange}></input>

                <button type="submit">SAVE</button>
                
            </div>
        </form>
    )
}

export default EditUserPage
