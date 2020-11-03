import React, { useContext, useEffect } from 'react';
import SingleTicketTab from './SingleTicketTab';
import {TicketTabContext} from '../../context/TicketTabContext';

const TicketTabList = () => {

    //This is the state for the list. This will tell how much tabs there are
    //and possibly the name of the tab
    const [ticketTabListState, setTicketTabList] = useContext(TicketTabContext);
    
    //delete tab that will be passed down. Will be passed down because the state
    //with the list of tabs is in this component.
    const middleMouseDeleteTab = (e,index) => {  
     
        //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (e.button == 1) {
            e.preventDefault();
            deleteTab(index);
        }

    }

    const deleteTab = (index) => {     
            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.
            console.log(index);


            let newTicketTabList = ticketTabListState.slice(0);
            newTicketTabList.splice(index, 1);
            setTicketTabList( newTicketTabList );


    }
    
    
    return(

        <div id="ticket_tab_container">

            {/* <div id="ticket_tab__horizontal_scroll_container" onWheel={(e) => mouseWheelScroll(e)}> */}
                {ticketTabListState.map((tab,i) => <SingleTicketTab 
                keynumber={i} 
                deleteTab={deleteTab}
                middleMouseDeleteTab={middleMouseDeleteTab}
                ticketNumber={ticketTabListState[i]}
                /> )}


        </div>

    );


}

export default TicketTabList;