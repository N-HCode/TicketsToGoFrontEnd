import React, {useContext} from 'react';
import InformationScreen from './components/InformationScreen';
import {StatusListContext} from '../context/StatusListContext';
import {PriorityListContext} from '../context/PriorityListContext';
import {OrganizationContext} from '../context/OrganizationContext'
import { addAStatus, removeAStatus } from '../../services/StatusListService';
import { addAPriority, removeAPriority} from '../../services/PriorityListService'


const TicketAdminPage = () => {

    
    const [statusList, setStatusList] = useContext(StatusListContext);

    const [priorityList, setPriorityList] = useContext(PriorityListContext);

    const [organization] = useContext(OrganizationContext);


    const saveToStatusList = async (status) => {
        try {
            await addAStatus(status);

            const newStatusList = statusList.statusListArray.slice(0);
            newStatusList.push(status);
            setStatusList({
                ...statusList,
                statusListArray: newStatusList
            });
            
        } catch (error) {
            alert(error);
        }

    }

    const removeFromStatusList = async (index,status) => {

        if(window.confirm("Do you want to remove this status?")){
            try {
                await removeAStatus(status);

                const newStatusList = statusList.statusListArray.slice(0);
                newStatusList.splice(index, 1);
                setStatusList({
                    ...statusList,
                    statusListArray: newStatusList
                });
                
            } catch (error) {
                alert(error);
            }
        }
    }

    const saveToPriorityList = async (priority) => {
        try {
            await addAPriority(priority);

            const newPriorityList = priorityList.slice(0);
            newPriorityList.push(priority);
            setPriorityList(newPriorityList);
            
        } catch (error) {
            alert(error);
        }
    }

    const removeFromPriorityList = async ( index,priority) => {

        if(window.confirm("Do you want to remove this priority?")){
            try {
                const response = await removeAPriority(priority);
                console.log(response);
    
                const newPriorityList = priorityList.slice(0);
                newPriorityList.splice(index, 1);
                setPriorityList(newPriorityList);
                
            } catch (error) {
                alert(error);
            }
        }



    }




    return (
        <div className="main_container">
            <div id="admin_page_container">
                <div className="admin_single_page">
                 
                    <div className="ticket_admin_content">

                        
                    <InformationScreen title={"Statuses"} 
                    data={statusList.statusListArray}
                    add={saveToStatusList}
                    remove={removeFromStatusList}
                    />

                    <InformationScreen title={"Priorities"} 
                    data={priorityList}
                    add={saveToPriorityList}
                    remove={removeFromPriorityList} />                       

                    </div>

                        
           
                </div>
            </div>
        </div>
    )
}

export default TicketAdminPage
