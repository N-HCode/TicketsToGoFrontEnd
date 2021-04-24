import React, { useContext, useState } from 'react';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';
import CreateNewTemplateModal from './optionsModals/CreateNewTemplateModal';
import {editTicketTemplate} from '../../../services/TicketColumnTempleService'

const CurrentTemplateOptions = () => {

    const [ticketColumnsContext] = useContext(TicketColumnsContext);
    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);

    const [newTemplateState, setNewTemplateState] = useState(false)
    const selectedIndex = primaryNavSelectedContext.index;
    const templateIndex = primaryNavSelectedContext.array[selectedIndex].state.selectedTemplate;

    const onSaveClick = async () => {

        if (window.confirm("Would you like to save the Ticket Template")) {
            const newColumnNames = ticketColumnsContext[templateIndex].columnStates.map(state => {return state.title})

            await editTicketTemplate({
                id: ticketColumnsContext[templateIndex].id,
                templateName: ticketColumnsContext[templateIndex].templateName,
                columnNames: newColumnNames
            })
            
        }

        

    }

    const openCreateNewTemplateModal = () => {
        setNewTemplateState(true)
    }

    const closeCreateNewTemplateModal = () => {
        setNewTemplateState(false)
    }


    return (
        <div className="template_icon_menus">
            <div>
                <i className="material-icons">settings</i>
                <i className="material-icons">people</i>
                <i className="material-icons" onClick={onSaveClick}>save</i>
                <i className="material-icons" onClick={openCreateNewTemplateModal}>add</i>
            </div>

            <i className="material-icons">delete_forever</i>

            <CreateNewTemplateModal modalIsOpen={newTemplateState} closeModalFunction={closeCreateNewTemplateModal}/>
        </div>

    )


}

export default CurrentTemplateOptions;