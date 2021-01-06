import React, {useState, useContext, useEffect} from 'react';
import TemplateDropdown from '../tickettemplateoptions/TemplateDropdown';
import CurrentTemplateOptions from '../tickettemplateoptions/CurrentTemplateOptions';
import TicketTabList from '../tickettab/TicketTabList';
import TicketColumnList from '../ticketcolumns/TicketColumnList';
import TicketInfo from '../ticketinfo/TicketInfo';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext'

const TicketTemplateContainer = () => {

    
    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const selectedIndex = primaryNavSelectedContext.index;


    const [ticketIsOpen, setTicketIsOpen] = useState(false);

    const [state, setState] = useState(primaryNavSelectedContext.array[selectedIndex].state);

    // state: {
    //     selectedTemplate: "",
    //     columns: []
    // }


    //Modal functions to open and close.


    const Check =() => {
        console.log(primaryNavSelectedContext)

    }

    useEffect(() => {
        primaryNavSelectedContext.array[selectedIndex].state = state;
    }, [state])

    useEffect(() => {
        setState(primaryNavSelectedContext.array[selectedIndex].state);
    }, [primaryNavSelectedContext])


    const onTemplateChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const openTicketModal = () => {
        setTicketIsOpen(true);
    }

    const closeTicketModal = () => {
        setTicketIsOpen(false);
    }


    return (
            <div className="template_container"
               
            
            >

                <button onClick={Check}>check</button>
                {/* template options selection */}
                <div className="template_options">
                   
                    
                    <TemplateDropdown state={state} onTemplateChange={onTemplateChange}/>
                    <CurrentTemplateOptions/>

                </div>

                {/* tab line */}
                <div className="tab_line"></div>

                {/* ticket tabs */}
                < TicketTabList openTicketModal={openTicketModal}/>

                {/* Ticket column container */}

                {/* <button onClick={openTicketModal}>Change</button> */}

                <TicketColumnList openTicketModal={openTicketModal}/>

                {ticketIsOpen && <TicketInfo ticketIsOpen={ticketIsOpen} closeTicketModal={closeTicketModal}/>}

                
            </div>
    )
}

export default TicketTemplateContainer
