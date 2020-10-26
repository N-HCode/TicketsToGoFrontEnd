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
            deleteTab(e, index);
        }

    }

    const deleteTab = (e,index) => {     
            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.
            let newTicketTabList = ticketTabListState.slice(0);
            newTicketTabList.splice(index, 1);
            setTicketTabList( newTicketTabList );


    }




    //useEffect takes two parameter. One is a function
    //The other is an array of this that when changed, the function happens
    //we just need the component to re-render, we can most likely use
    //the userEffect hook instead of cloning the array.
    useEffect(() =>{
        window.addEventListener("test", TicketTabContext)
    })

    
    
    return(

        <div id="ticket_tab_container">

            {/* <div id="ticket_tab__horizontal_scroll_container" onWheel={(e) => mouseWheelScroll(e)}> */}
                {ticketTabListState.map((tab,i) => <SingleTicketTab 
                keynumber={i} 
                deleteTab={deleteTab}
                middleMouseDeleteTab={middleMouseDeleteTab}
                /> )}


        </div>

    );


}

export default TicketTabList;