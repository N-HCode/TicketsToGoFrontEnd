import React, { useContext} from 'react';
import SingleTicketColumn from './SingleTicketColumn';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';



const TicketColumnList = (props) => {


    const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);

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
            title: "new",
            isEdit: false
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


    return(
        <div id="ticket_columns_container">

            <div id="add_new_ticket_column_icon">
                <i className="material-icons" onClick={AddNewColumn}>add_circle</i>
                <p>add column</p>
            </div>
         
            
            <div id="ticket_column_list" onWheel={mouseWheelScroll}>

                {ticketColumnListState.map((ticketColumn, index) => <SingleTicketColumn 
                    keyIndex = {index}
                    ticketColumn={ticketColumn}
              

                /> )
                }
            </div>



        </div>
    );


}

export default TicketColumnList;