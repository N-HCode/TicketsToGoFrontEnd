import React, {useState, useContext, useEffect} from 'react';
import TemplateDropdown from '../tickettemplateoptions/TemplateDropdown';
import CurrentTemplateOptions from '../tickettemplateoptions/CurrentTemplateOptions';
import TicketTabList from '../tickettab/TicketTabList';
import TicketColumnList from '../ticketcolumns/TicketColumnList';
import TicketInfo from '../ticketinfo/TicketInfo';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';

const TicketTemplateContainer = () => {

    
    const [primaryNavSelectedContext, setprimaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const selectedIndex = primaryNavSelectedContext.index;

    const ticketColumnsContext = useContext(TicketColumnsContext);


    const [ticketIsOpen, setTicketIsOpen] = useState(false);

    const [state, setState] = useState(primaryNavSelectedContext.array[selectedIndex].state);

    // state: {
    //     selectedTemplate: "",
    //     columns: []
    // }


    //Modal functions to open and close.


    useEffect(() => {
        primaryNavSelectedContext.array[selectedIndex].state = state;
        const newArray = primaryNavSelectedContext.array.slice(0);
        setprimaryNavSelectedContext({
            ...primaryNavSelectedContext,
            array: newArray
        })


    }, [state])

    useEffect(() => {
        setState(primaryNavSelectedContext.array[selectedIndex].state);
    }, [primaryNavSelectedContext])


    const onTemplateChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.selectedIndex
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

         
                {/* template options selection */}
                <div className="template_options">
                   
                    
                    <TemplateDropdown selectedIndex={selectedIndex} onTemplateChange={onTemplateChange}/>
                    <CurrentTemplateOptions/>

                </div>

                {/* tab line */}
                <div className="tab_line"></div>

                {/* ticket tabs */}
                < TicketTabList openTicketModal={openTicketModal}/>

                {/* Ticket column container */}

                {/* <button onClick={openTicketModal}>Change</button> */}

                <TicketColumnList selectedIndex={selectedIndex} state={state} setState={setState} openTicketModal={openTicketModal}/>

                {ticketIsOpen && <TicketInfo ticketIsOpen={ticketIsOpen} closeTicketModal={closeTicketModal}/>}

                
            </div>
    )
}

export default TicketTemplateContainer
