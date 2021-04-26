import React, {useState,useContext} from 'react';
import Modal from 'react-modal';
import {createTicketTemplate} from '../../../../services/TicketColumnTempleService';
import {TicketColumnsContext} from '../../../context/TicketColumnsContext';

const CreateNewTemplateModal = ({modalIsOpen, closeModalFunction}) => {

    const [ticketColumnsContext, setTicketColumnsContext] = useContext(TicketColumnsContext);
    const [templateNameState, setTemplateNameState] = useState({});

    const onChange = (e) => {
        setTemplateNameState({
            ...templateNameState,
            [e.target.name]: e.target.value
        })
    }

    const createNewTicketTemplate = async (e) => {
        e.preventDefault();

        try {
            
            const response = await createTicketTemplate(templateNameState);
            const newTicketColumnContext = ticketColumnsContext.slice(0);

            newTicketColumnContext.push({
                id: response.data,
                templateName: templateNameState.templateName,
                columnStates: []

            })

            setTicketColumnsContext(newTicketColumnContext);

            closeModalFunction();


            
        } catch (error) {
            console.log(error)
        }



    }



    return (
        <Modal
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={modalIsOpen} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeModalFunction}>
            <div className="modal_container">
                {/* close window button */}
                {/* <div className="modal_window_bar">
                    <i className="material-icons" onClick={closeModalFunction} >close</i>
                </div> */}

                <h3>Create a new Ticket Template</h3>

                <hr></hr>

            
                {/* main screen */}
                <form onSubmit={createNewTicketTemplate} className="modal_container">

                    <div className="form_modal_container">
                        <label htmlFor="template_name">Name:</label>
                        <input type="text" name="templateName" onChange={onChange} required></input>
                    </div>

                    {/* submit button*/}
                    <div className="form_button_modal_container">
                        <button type="button" onClick={closeModalFunction}>Cancel</button>
                        {/* buttons in a form are by default type of submit. So we do not need to add the type */}
                        <button>Submit</button>
                    
                    </div>
                </form>
            </div>
   


        </Modal>
    )
}

export default CreateNewTemplateModal
