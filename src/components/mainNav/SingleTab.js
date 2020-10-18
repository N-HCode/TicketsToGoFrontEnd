import React, { useState, useEffect } from 'react';

const SingleTab = (props) => {


    return(
        // onMoustDown is the middle mouse button click.
        <div className="primary_tab__singletab" key={props.keynumber} onMouseDown={() => props.deleteTab(props.keynumber)}>
            <p>New Tab</p>
            <i className="material-icons" onClick={() => props.deleteTab(props.keynumber)}>close</i>
        </div>
    );


}

export default SingleTab