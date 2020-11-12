import React from 'react'
import Searchbar from './SearchBar';
import MainNavOptions from './MainNavOptions';

const MainNavBar = () => {


    return ( 
    
        <div id="header_container">

            {/* main nav and search bar */}
            <div id="main_nav">

                <Searchbar/>
                <MainNavOptions/>

            </div>
        </div>
)
}

export default MainNavBar
