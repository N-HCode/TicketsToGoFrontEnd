import React from 'react';

const SinglePrimaryTab = (props) => {


    return(
        // onMouseDown is the middle mouse button click.
        <div className="primary_tab__singletab animate_singletab" key={"primary_tab_"+props.keynumber} onMouseDown={(e) => props.middleMouseDeleteTab(e,props.keynumber)}>
            <p>{props.title}</p>
            <i className="material-icons" onClick={() => props.deleteTab(props.keynumber)}>close</i>
        </div>
    );


}

export default SinglePrimaryTab;