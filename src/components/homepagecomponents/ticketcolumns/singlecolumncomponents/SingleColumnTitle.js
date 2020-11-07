import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {TicketColumnsContext} from '../../../context/TicketColumnsContext';
import { TicketContext } from '../../../context/TicketContext';

const SingleColumnTitle = (props) => {

    const [ticketColumnListState, setticketColumnList] = useContext(TicketColumnsContext);
    const [ tickets ] = useContext(TicketContext);
    //this is used on the pencil icon to edit the title of the
    //columns
    const editTitle = () => {

        if (props.ticketColumnTitle.isEdit) {
            ticketColumnListState[props.ticketColumnIndex]
            .title = props.ticketColumnTitle.title;
    
       
            ticketColumnListState[props.ticketColumnIndex]
            .ticketList = tickets.filter( ticket => ticket.status == ticketColumnListState[props.ticketColumnIndex].title);
            
        }


   

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
