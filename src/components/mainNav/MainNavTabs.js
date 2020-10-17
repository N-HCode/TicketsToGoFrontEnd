import React, { useState, useEffect } from 'react';
import SingleTab from './SingleTab';

const MainNavTabs = () => {

    const [navTabListState, setNavTabList] = useState(["hello", "hello", "hello"]);
    
    const addNewPrimaryTab = () => {
        
        //The setState will only re-render if a new object is setted.
        //Thus we have to create a new array from the old one.
        //one way to do this is to use the .slice(0)
        //https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        let newTabList = navTabListState.slice(0);
        newTabList.push("hello");
        setNavTabList( newTabList );
        console.log(newTabList);

    }

    //useEffect takes two parameter. One is a function
    //The other is an array of this that when changed, the function happens
    //we just need the component to re-render, we can most likely use
    //the userEffect hook instead of cloning the array.
    useEffect(() =>{
        
    }, [])

    
    
    return(

        <div id="primary_tab__tab_container">


            {navTabListState.map((tab,i) => <SingleTab keynumber={i}/> )}
        
            <i className="material-icons" onClick={addNewPrimaryTab} >add</i>
        

        </div>

    );


}

export default MainNavTabs;