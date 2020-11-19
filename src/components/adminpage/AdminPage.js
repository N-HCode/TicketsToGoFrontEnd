import React, {useContext} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';;

const AdminPage = () => {

    const [organization] = useContext(OrganizationContext);

    


    return (
        <div className="main_container">
            <div id="admin_page_container">
                <div className="admin_single_page">


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
