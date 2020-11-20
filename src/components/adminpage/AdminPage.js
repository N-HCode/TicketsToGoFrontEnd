import React, {useContext} from 'react';
import { OrganizationContext} from '../context/OrganizationContext';
import { UserContext } from '../context/UserContext';

const AdminPage = () => {

    const [organization] = useContext(OrganizationContext);

    const table_config = {
        headers:[],
        data: null
    }


    return (
        <div className="main_container">
            <div id="admin_page_container">
                <div className="admin_single_page">

                    <div className="table_container">

                        <table className="admin_person_table">
                            <thead>
                                <tr>
                                    <th>Hello</th>
                                    <th>Yes</th>

                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>Wassup</td>
                                    <td>yoyoyo</td>

                                </tr>

                            </tbody>


                        </table>

                    </div>




                </div>

            </div>
            
        </div>
    )
}

export default AdminPage
