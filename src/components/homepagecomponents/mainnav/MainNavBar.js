import React from 'react'
import Searchbar from './SearchBar';
import MainNavOptions from './MainNavOptions';
import {Auth} from '../../../routing/Auth';

const MainNavBar = () => {


    return ( 
    
        <div id="header_container">

            {/* main nav and search bar */}
            <div id="main_nav">

                <Searchbar/>
                <div className="main_nav_container">
                  
                    <p>{Auth.userData? "Hello " + Auth.userData.firstName : ""} </p>
                   
                    
                    <MainNavOptions/>
                </div>
            

            </div>
        </div>
)
}

export default MainNavBar
