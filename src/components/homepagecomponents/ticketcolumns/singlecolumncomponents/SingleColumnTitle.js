import React from 'react'
import {NavLink} from 'react-router-dom';

const SingleColumnTitle = (props) => {
    
    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {

        props.setTicketColumnTitle({
            //spread operator to keep the original values and not override them
            //then you enter in the property you want to override
            ...props.ticketColumnTitle,
            isEdit: !props.ticketColumnTitle.isEdit})
    }

    //this onchange function takes the value of the input and
    //update the state of the title every time you change
    //the input real time.
    const onChange = (e) => {
        props.setTicketColumnTitle({
            ...props.ticketColumnTitle,
            title: e.target.value
        })
       
    }
    
    
    return (

        <div className="column_title">
            <i className="material-icons" onClick={editTitle} >edit</i>
            {props.ticketColumnTitle.isEdit ?
            <input 
                onChange={onChange} 
                value={props.ticketColumnTitle.title}
                maxLength="15">
            </input>
                : 
                <p>{props.ticketColumnTitle.title}</p>
            }

            <NavLink className="material-icons" to="/createTicket">add</NavLink>
        </div>
    )
}

export default SingleColumnTitle
