import React, { useContext } from 'react';
import SingleTicketTab from './SingleTicketTab';
import {TicketTabContext} from '../../context/TicketTabContext';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';


const TicketTabList = ({openTicketModal}) => {

    const [primaryNavSelectedContext,setPrimaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const ticketTabState = primaryNavSelectedContext.array[primaryNavSelectedContext.index]

    //This is the state for the list. This will tell how much tabs there are
    //and possibly the name of the tab
    const [ticketTabListState, setTicketTabList] = useContext(TicketTabContext);
    var container;
    //delete tab that will be passed down. Will be passed down because the state
    //with the list of tabs is in this component.
    const middleMouseDeleteTab = (e,index) => {  
     
        //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (e.button == 1) {
            e.preventDefault();
            deleteTab(e,index);
        }

    }

    const deleteTab = (e,index) => {     
            e.stopPropagation()
            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.

            ticketTabState.state.ticketTab.splice(index, 1);
            const newState = primaryNavSelectedContext.array.slice(0);
            setPrimaryNavSelectedContext({
                ...primaryNavSelectedContext,
                array: newState

            })



    }

    // const mouseWheelScroll = (e) => {
    //     //this is to prevent the default vertical scroll.
    //     e.preventDefault();

    //     //this is to get the scrollable container
    //     if(container === undefined){
    //         container = document.getElementById("ticket_tab_container");
    //     }

    //     container.scrollLeft += e.deltaY*85;

    // }
    
    
    return(
        <div id="ticket_tab_hidden_container">
            <div id="ticket_tab_container" 
            // onWheel={mouseWheelScroll}
            >

                {/* <div id="ticket_tab__horizontal_scroll_container" onWheel={(e) => mouseWheelScroll(e)}> */}
                    {ticketTabState.state.ticketTab.map((tab,i) => <SingleTicketTab
                    key={"ticket_tab_"+ i} 
                    keynumber={i} 
                    deleteTab={deleteTab}
                    middleMouseDeleteTab={middleMouseDeleteTab}
                    ticketNumber={tab}
                    openTicketModal={openTicketModal}
                    /> )}


            </div>
        </div>

    );


}

export default TicketTabList;