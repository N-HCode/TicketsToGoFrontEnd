import React, {useState} from 'react';
import Modal from 'react-modal';
import AddNewClientOrgForm from './clientorgmodalcomponents/AddNewClientOrgForm'

const ClientOrgModal = ({openClientOrgModal, closeFindModal}) => {


    const [addNewClientOrgState, setAddNewClientOrgState] = useState(false);

    //This is to signal to the lower component that it is about to be dismounted.
    //The reason we want this is so we can apply a dismount animation before it actually get dismounted.
    //After the animation, then we can just get rid of the component.
    const [signalAddNewClientCloseState, setSignalAddNewClientCloseState] = useState(false);

    const expandNewClientOrgForm = () =>{

        if (addNewClientOrgState) {
            setSignalAddNewClientCloseState(true);
        }else{
            setAddNewClientOrgState(true);
        }


      
    }



    return (
        <Modal
        className="modal"
        overlayClassName ="modal_overlay"   
        isOpen={openClientOrgModal} 
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeFindModal}>

            <div className="client_org_modal_container">

                <h3>Find/Add Client Organization</h3>

                <hr></hr>


                <div className="client_org_modal">

                    <button>Existing Client Organization</button>
                    <button onClick={expandNewClientOrgForm}>New Client Organization</button>

                </div>

               {addNewClientOrgState && 
               <AddNewClientOrgForm 
               signalAddNewClientCloseState = {signalAddNewClientCloseState}
               setSignalAddNewClientCloseState= {setSignalAddNewClientCloseState}
               setAddNewClientOrgState={setAddNewClientOrgState}/> }


            </div>

        </Modal>
    )
}

export default ClientOrgModal
