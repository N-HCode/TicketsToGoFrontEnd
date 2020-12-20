import React, { useState, useEffect, useRef } from 'react';
import SingleTab from './SinglePrimaryTab';

const PrimaryNavTabs = () => {

    //This is the state for the list. This will tell how much tabs there are
    //and possibly the name of the tab
    const [addState, setAddState] = useState(true);
    const [deleteState, setDeleteState] = useState(0);
    const [navTabListState, setNavTabList] = useState(["YO", "YOYO", "hello"]);
    var container;
    const addNewPrimaryTab = () => {
        //The setState will only re-render if a new object is setted.
        //Thus we have to create a new array from the old one.
        //one way to do this is to use the .slice(0)
        //https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newTabList = navTabListState.slice(0);
        newTabList.push("New Tab");
        setAddState(!addState);
        setNavTabList( newTabList);
     
    }
    const animateTimeout = 50;
    let currentAddState = useRef(addState);
    let currentDeleteState = useRef(deleteState);
    let elements = useRef();
    useEffect(() =>{
        if(addState != currentAddState.current){
            var length = elements.current.children.length;
            var lastElement = elements.current.children[length-1];
            setTimeout(
                () => lastElement.classList.remove("animate_singletab"),
                animateTimeout
            )

            currentAddState.current = addState;
        }       
     
    },[navTabListState])


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
            deleteTab(index);
        }

    }

    const deleteTab = (index) => {     
            //splice can remove at a specific index. 2nd parameter is number of elements to remove.
            //The splice() method returns an array with the deleted items. So the splice changes
            //the original array and just returns the leftover.
            let newTabList = navTabListState.slice(0);
            newTabList.splice(index, 1);
            setNavTabList( newTabList );

    }

    
 
    
    return(

        <div id="primary_tab__tab_container">

            <div id="primary_tab__horizontal_scroll_container" 
            ref={elements}
            // onWheel={mouseWheelScroll}
            >
                {navTabListState.map((tab,i) => 
                <SingleTab 
                key={"primary_tab_"+i}
                deleteTab={deleteTab}
                middleMouseDeleteTab = {middleMouseDeleteTab}
                title = {navTabListState[i]}
                /> )}
            </div>
            
        
            <i className="material-icons" onClick={addNewPrimaryTab} >add</i>
        

        </div>

    );


}

export default PrimaryNavTabs;