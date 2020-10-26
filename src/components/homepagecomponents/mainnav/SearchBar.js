import React, { useState, useEffect } from 'react';

const Searchbar = () => {


    return (
        <div id="main_nav__search_container">
            <div id="main_nav__search_box">
                <input  type="text" name="" placeholder="search"/>
                <i className="material-icons">search</i> 
            </div>

        
            <a href="#">Advance Search</a>

        </div>

    )


}

export default Searchbar;