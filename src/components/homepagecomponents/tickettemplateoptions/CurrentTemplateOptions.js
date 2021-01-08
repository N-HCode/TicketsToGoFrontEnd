import React, { useContext } from 'react';
import {TicketColumnsContext} from '../../context/TicketColumnsContext';
import { PrimaryNavSelectedContext } from '../../context/PrimaryNavSelectedContext';

const CurrentTemplateOptions = () => {

    const [ticketColumnsContext] = useContext(TicketColumnsContext);
    const [primaryNavSelectedContext, setprimaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);

    const onSaveClick = () => {


    }


    return (
        <div className="template_icon_menus">
            <div>
                <i className="material-icons">settings</i>
                <i className="material-icons">people</i>
                <i className="material-icons" onClick={onSaveClick}>save</i>
            </div>

            <i className="material-icons">delete_forever</i>
        </div>

    )


}

export default CurrentTemplateOptions;