import React from 'react';



const SinglePrimaryTab = (props) => {

    return(
        // onMouseDown is the middle mouse button click.
        <div className="primary_tab__singletab animate_singletab"
            onClick = {() => props.onPrimaryTabClick(props.index)}
            onMouseDown={(e) => props.middleMouseDeleteTab(e,props.index)}>
            <p>{props.title}</p>
            <i className="material-icons" onClick={() => props.deleteTab(props.index)}>close</i>
        </div>
    );


}

export default SinglePrimaryTab;