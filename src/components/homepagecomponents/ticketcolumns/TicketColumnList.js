import React, { useState, useEffect, useContext, useRef } from 'react';
import SingleTicketColumn from './SingleTicketColumn';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { TicketContext } from '../../context/TicketContext';


const TicketColumnList = (props) => {


    const [ticketColumnListState, setticketColumnList] = useState([
        {   
            status: "new",
            id: 1,
        },
        {   
            status: "in-progress",
            id: 2,
        },
        {   
            status: "pending",
            id: 3,
        }
    ]);

    // const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);
    // const [ tickets ] = useContext(TicketContext);


    var container;

    const AddNewColumn = () => {

        
        // The setState will only re-render if a new object is setted.
        // Thus we have to create a new array from the old one.
        // one way to do this is to use the .slice(0)
        // https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newColumnList = ticketColumnListState.slice(0);
        newColumnList.push({
            title: "new"
        });
        setticketColumnList( newColumnList );

     
    }


    //need to use JS to implement a mouse wheel scrolling function.
    const mouseWheelScroll = (e) => {
        //this is to prevent the default vertical scroll.
        e.preventDefault();

        //this is to get the scrollable container
        if(container === undefined){
            container = document.getElementById("ticket_column_list");
        }
        
        //this is a scroll event
        container.scrollLeft += e.deltaY*150;
 
   

    }


    const deleteTab = (e,index) => {     
            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.
            // let newTabList = navTabListState.slice(0);
            // newTabList.splice(index, 1);
            // setNavTabList( newTabList );
    }

    useEffect(() =>{
        
    }, [])


    const onClick = () => {
        console.log(ticketColumnListState[0].refreshTickets);
    }
 
    return(
        <div id="ticket_columns_container">

            <div id="add_new_ticket_column_icon">
                <i className="material-icons" onClick={AddNewColumn}>add_circle</i>
                <p>add column</p>
            </div>
         
            
            <div id="ticket_column_list" onWheel={mouseWheelScroll}>

                {ticketColumnListState.map((ticketColumn) => <SingleTicketColumn 
                    key = {ticketColumn.id}
                    ticketColumn={ticketColumn}

                /> )}
            </div>



        </div>
    );


}

export default TicketColumnList;