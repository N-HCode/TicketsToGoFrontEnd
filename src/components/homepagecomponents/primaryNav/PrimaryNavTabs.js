import React, { useState, useEffect, useRef, useContext } from 'react';
import SingleTab from './SinglePrimaryTab';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { COMPONENTTYPENUMBER } from '../../constants/Components';


const PrimaryNavTabs = () => {

    const [primaryNavSelectedContext, setPrimaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const [ticketColumnsContext] = useContext(TicketColumnsContext);
    //This is the state for the list. This will tell how much tabs there are
    //and possibly the name of the tab
    const [navTabListState, setNavTabList] = useState([]);
   
    const addNewPrimaryTab = () => {
        //The setState will only re-render if a new object is setted.
        //Thus we have to create a new array from the old one.
        //one way to do this is to use the .slice(0)
        //https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop

        let selectedIndex = primaryNavSelectedContext.array.length;

        primaryNavSelectedContext.array.push(
            {
                type: COMPONENTTYPENUMBER.TicketTemplateContainer,
                tabTitle: "",
                state: {
                    selectedTemplate: 0,
                    ticketTab:[],
                }
            }

        )

        setPrimaryNavSelectedContext({
            ...primaryNavSelectedContext,
            index: selectedIndex
        })

  
    }

    
 
    const elements = useRef();
    const oldActiveTab = useRef();

    useEffect(() =>{
    
        elements.current.children[oldActiveTab.current]?.classList.remove("active");
        oldActiveTab.current = primaryNavSelectedContext.index;
        //We need the ? because by default, the index is -1. Which is make an undefined.
        //The ? will make it so this code only happens if the object is not null/undefined.
        elements.current.children[primaryNavSelectedContext.index]?.classList.add("active");

    },[primaryNavSelectedContext])


    // //need to use JS to implement a mouse wheel scrolling function.
    // const mouseWheelScroll = (e) => {
    //     //this is to prevent the default vertical scroll.
    //     e.preventDefault();

    //     //this is to get the scrollable container
    //     if(container === undefined){
    //         container = document.getElementById("primary_tab__horizontal_scroll_container");
    //     }

    //     container.scrollLeft += e.deltaY*85;

    // }

    //delete tab that will be passed down. Will be passed down because the state
    //with the list of tabs is in this component.
    const middleMouseDeleteTab = (e,index) => {  
     
        //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (e.button == 1) {
            e.preventDefault();
            deleteTab(e,index);
        }

    }

    const deleteTab = (e, index) => {
            //Since the Delete icon is in a div that is also clickable. We need it to stop from Propagating
            e.stopPropagation();

            // console.log(index === primaryNavSelectedContext.index);
            // console.log(primaryNavSelectedContext.array.length -1);

            //We need this logic here as the user can delete tabs that is
            //below the current active index, the active index, or a tab above the active index
            const selectedIndex = (index === primaryNavSelectedContext.index?
                index < primaryNavSelectedContext.array.length -1?
                    index
                    :
                    index -1
                :
                index < primaryNavSelectedContext.index?
                    primaryNavSelectedContext.index -1
                    :
                    primaryNavSelectedContext.index)


            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.
            //We do this because we would like the components to rerender whenever the user deletes
            //a tab. And React will only rerender if there is a change in the state.
            primaryNavSelectedContext.array.splice(index, 1);
            const newArray = primaryNavSelectedContext.array.slice(0);

            setPrimaryNavSelectedContext({
                index: selectedIndex,
                array: newArray
            })

        
            let newTabList = navTabListState.slice(0);
            newTabList.splice(index, 1);
            setNavTabList( newTabList );


    }

    const onPrimaryTabClick = (index) => {

        setPrimaryNavSelectedContext({
            ...primaryNavSelectedContext,
            index: index,
        })

        let newTabList = navTabListState.slice(0);
        setNavTabList( newTabList );


    }
 
    
    return(
        <div id="primary_tab">


            <div id="primary_tab__tab_container">

                <div id="primary_tab__horizontal_scroll_container" 
                ref={elements}
                // onWheel={mouseWheelScroll}
                >
                    {primaryNavSelectedContext.array.map((tab,i) => 
                    <SingleTab 
                    index = {i}
                    key={"primary_tab_"+i}
                    deleteTab={deleteTab}
                    middleMouseDeleteTab = {middleMouseDeleteTab}
                    onPrimaryTabClick = {onPrimaryTabClick}
                    title = {
                        ticketColumnsContext[primaryNavSelectedContext.array[i].state.selectedTemplate].templateName
                    }
                    /> )}
                </div>
                
            
                <i className="material-icons" onClick={addNewPrimaryTab} >add</i>
            

            </div>

            <div className="tab_line"></div>

        </div>        



    );


}

export default PrimaryNavTabs;