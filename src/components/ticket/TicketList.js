import React, {useEffect } from 'react'
import Ticket from './Ticket';


const TicketList = (props) => {
    
    // created temp data for testing because the plan is to use the Context Hook here to pull in the data
    // to pass down to each individual ticket component

    // The state that will hold the data 

    // Component did Mount

    useEffect(() => {
        // empty dependancy array to mount component one time
        // empty dependancy array to mount component one time
    },[props])

  
            
    // Update this component every 60 seconds 
    useEffect(() => {
        const interval = setInterval(() => {
            // update home page every 60 sec but not in use for now
            // axios.get(findAll)
            // .then( response => setTicketList(response.data) )
        }, 60000);
        return () => {
            clearInterval(interval)
        }
    }, [])

       // mapping through the array to create a ticket component for each object in the array
    return (

        <div>
            {props.ticketList.length > 0 && props.ticketList.map( ticket => <Ticket ticket={ticket} key={ticket.ticketNumber} 
                openTicketModal={props.openTicketModal}
            
            
            />  ) }

        </div>
    )
}

export default TicketList;


// temp test data
// {
//     subject: "subject of testTicket1",
//     description: "description of testTicket1",
//     ticketNumber: "0001",
//     ticketOwner: {firstName: "Pepega"}
// },
// {
//     subject: "subject of testTicket2",
//     description: "description of testTicket2",
//     ticketNumber: "0002",
//     ticketOwner: {firstName: "Sadge"}
// },
// {
//     subject: "subject of testTicket2",
//     description: "description of testTicket2",
//     ticketNumber: "0003",
//     ticketOwner: {firstName: "Kappa"}
// }