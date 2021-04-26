import React, {useState} from 'react';
import Modal from 'react-modal';
import AddNewClientOrgForm from './clientorgmodalcomponents/AddNewClientOrgForm'

const ClientOrgModal = ({openClientOrgModal, closeFindModal}) => {


    const [addNewClientOrgState, setAddNewClientOrgState] = useState(false);

    const expandNewClientOrgForm = () =>{
        setAddNewClientOrgState(!addNewClientOrgState);
    }



    return (
        <Modal
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={openClientOrgModal} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeFindModal}>

            <div>

                <h3>Find/Add Client Organization</h3>

                <hr></hr>


                <div className="client_org_modal">

                    <button>Existing Client Organization</button>
                    <button onClick={expandNewClientOrgForm}>New Client Organization</button>

                </div>

               {addNewClientOrgState && <AddNewClientOrgForm /> }


            </div>

        </Modal>
    )
}

export default ClientOrgModal
