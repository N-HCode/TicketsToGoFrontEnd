import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import CreateOrganizationForm from './CreateOrganizationForm'

const CreateOrganization = () => {

    const [user] = useContext(UserContext)

    return (
        <div>
            {user.username ? user.userRole === ("admin") ? 
                    <CreateOrganizationForm/>
                    : <h4>Not admin</h4> 
                
                : <h4>Not logged in</h4>}
        </div>
    )
}

export default CreateOrganization
