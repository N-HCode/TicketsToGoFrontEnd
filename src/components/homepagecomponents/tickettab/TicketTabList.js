import React, { useState, useEffect } from 'react';
import SingleTicketTab from './SingleTicketTab';

const TicketTabList = () => {

    //This is the state for the list. This will tell how much tabs there are
    //and possibly the name of the tab
    const [ticketTabListState, setTicketTabList] = useState(["hello", "hello", "hello"]);
    
    const addNewTicketTab = () => {
        
        //The setState will only re-render if a new object is setted.
        //Thus we have to create a new array from the old one.
        //one way to do this is to use the .slice(0)
        //https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newTicketTabList = ticketTabListState.slice(0);
        newTicketTabList.push("hello");
        setTicketTabList( newTicketTabList );
    }


    //need to use JS to implement a mouse wheel scrolling function.
    const mouseWheelScroll = (e) => {
        //this is to prevent the default vertical scroll.
        e.preventDefault();

        //this is to get the scrollable container
        var container = document.getElementById("ticket_tab__horizontal_scroll_container");
        //this is a scroll event
        container.scrollTo({
            //The deltaY property returns a positive value when scrolling down, and a negative value when scrolling up, otherwise 0.
            left: container.scrollLeft + e.deltaY*85,
            behavior: "smooth"
        })
        console.log(e.deltaY);

    }

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
        
    }, [])

    
    
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