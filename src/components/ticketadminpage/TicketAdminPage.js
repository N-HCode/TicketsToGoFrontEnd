import React, {useContext} from 'react';
import InformationScreen from './components/InformationScreen';
import {StatusListContext} from '../context/StatusListContext';
import {PriorityListContext} from '../context/PriorityListContext';

const TicketAdminPage = () => {

    const [statusList] = useContext(StatusListContext);

    const [priorityList] = useContext(PriorityListContext);


    return (
        <div className="main_container">
            <div id="admin_page_container">
                <div className="admin_single_page">
                 
                    <div className="ticket_admin_content">

                        
                    <InformationScreen title={"Statuses"} data={statusList.statusListArray}/>

                    <InformationScreen title={"Priorities"} data={priorityList}/>


                    </div>

                        
           
                </div>
            </div>
        </div>
    )
}

export default TicketAdminPage
