import React, { useContext} from 'react';
import SingleTicketColumn from './SingleTicketColumn';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';


//https://github.com/willmcpo/body-scroll-lock#readme



const TicketColumnList = ({selectedIndex,state,setState, openTicketModal}) => {

    // state: {
    //     selectedTemplate: "",
    //     ticketTab:[],
    //     columns: []
    // }

    const AddNewColumn = () => {

        
        // The setState will only re-render if a new object is setted.
        // Thus we have to create a new array from the old one.
        // one way to do this is to use the .slice(0)
        // https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newColumnList = state.columns.slice(0);
        newColumnList.push({
            title: "New",
            isEdit: false

        });

        setState({
            ...state,
            columns: newColumnList
        });

     
    }


    // //need to use JS to implement a mouse wheel scrolling function.
    // const mouseWheelScroll = (e) => {
    //     e.preventDefault();

    //     //this is to get the scrollable container
    //     if(container === undefined){
    //         container = document.getElementById("ticket_column_list");
    //     }
        
    //     //this is a scroll event
    //     container.scrollLeft += e.deltaY*150;
        
    // }



    return(
        <div id="ticket_columns_container">

            <div id="add_new_ticket_column_icon">
                <i className="material-icons" onClick={AddNewColumn}>add_circle</i>
                <p>add column</p>
            </div>
         
            
            <div id="ticket_column_list" 
                // onWheel={(e) => mouseWheelScroll(e)}  
            >

                {state.columns.map((columnData, index) => <SingleTicketColumn
                    //Need that Random number, so that each can have a unique key when it deletes
                    //Key is used to identify the multiple components. If two component have the same key,
                    //There may be some overlap in component-level state information.
                    //This is important if the components can be deleted as another component can get
                    //the key of a previously deleted component.
                    key = {"single_ticket_column"+ index + "_pri_nav_" + selectedIndex + "random_" + Math.random()*10000000}
                    selectedIndex={selectedIndex}
                    state = {state}
                    setState = {setState}
                    keyIndex = {index}
                    columnData ={columnData}
                    openTicketModal={openTicketModal}

                /> )
                }
            </div>



        </div>
    );


}

export default TicketColumnList;