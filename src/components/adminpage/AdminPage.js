import React, {useContext} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import { UserContext } from '../context/UserContext';

const AdminPage = () => {

    const [organization] = useContext(OrganizationContext);
    const [user] = useContext(UserContext)

    const table_config = {
        headers:["Action","First Name", "Last Name", "Email","Username","Role", "Last Modified"],
        data: [user]
    }


    return (
        <div className="main_container">
            <div id="admin_page_container">
                <div className="admin_single_page">
                    <div className="admin_single_page_content">

                        <div className="admin_icon_right"><i className="material-icons">person_add_alt_1</i></div>

                        <div className="table_container">

                            <table className="admin_person_table">
                                <thead>
                                    <tr>
                                        {table_config.headers.map((header) => 
                                            <th>{header}</th>
                                        )}

                                    </tr>

                                </thead>
                                <tbody>

                                {table_config.data !== undefined && table_config.data.length > 0 && table_config.data.map((user, index) =>
                                    
                                    <tr>
                                        <td><div><i className="material-icons">edit</i></div></td>
                                        <td><div>{user.firstName}</div></td>
                                        <td><div>{user.lastName}</div></td>
                                        <td><div>{user.email}</div></td>
                                        <td><div>{user.username}</div></td>
                                        <td><div>{user.userRole}</div></td>
                                        <td><div>{user.lastModified}</div></td>
                                    </tr>
                                    
                                )}


                                </tbody>


                            </table>

                    </div>

                </div>


                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
