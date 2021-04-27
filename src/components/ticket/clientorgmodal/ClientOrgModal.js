import React, {useState} from 'react';
import Modal from 'react-modal';

import ExpandAndCollapseAnimation from './clientorgmodalcomponents/ExpandAndCollapseAnimation';
import AddNewClientOrgForm from './clientorgmodalcomponents/AddNewClientOrgForm';
import FindExistingOrg from './clientorgmodalcomponents/FindExistingOrg;'

const ClientOrgModal = ({openClientOrgModal, closeFindModal}) => {

    
    const [addNewClientOrgState, setAddNewClientOrgState] = useState(false);
    const [findExistingOrg, setFindExistingOrg] = useState(false);

    const expandNewClientOrgForm = (e) =>{
        setAddNewClientOrgState(!addNewClientOrgState);

        e.target.classList.toggle("active");
    }

    const closeMainModal = () => {
        closeFindModal();
        //Need to do this so that the state resets to false whenever we close the modal
        setAddNewClientOrgState(false);
    }




    return (
        <Modal
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={openClientOrgModal} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeMainModal}>

            <div className="client_org_modal_container">

                <h3>Find/Add Client Organization</h3>

                <hr></hr>


                <div className="client_org_modal_button">

                    <button>Existing Client Organization</button>
                    <button onClick={expandNewClientOrgForm}>New Client Organization</button>

                </div>

                <ExpandAndCollapseAnimation isActive={addNewClientOrgState}>
                    <AddNewClientOrgForm />
                </ExpandAndCollapseAnimation>

                <ExpandAndCollapseAnimation isActive={findExistingOrg}>
                    <FindExistingOrg />
                </ExpandAndCollapseAnimation>



            </div>

        </Modal>
    )
}

export default ClientOrgModal
