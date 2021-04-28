import React, {useState, useRef} from 'react';
import Modal from 'react-modal';

import ExpandAndCollapseAnimation from './clientorgmodalcomponents/ExpandAndCollapseAnimation';
import AddNewClientOrgForm from './clientorgmodalcomponents/AddNewClientOrgForm';
import FindExistingOrg from './clientorgmodalcomponents/FindExistingOrg';
import MountAndDismountAnimiation from '../../../helper/MountAndDismountAnimiation';

const ClientOrgModal = ({openClientOrgModal, closeFindModal}) => {

    
    const [addNewClientOrgState, setAddNewClientOrgState] = useState(false);
    const [findExistingOrg, setFindExistingOrg] = useState(false);

    const expandNewClientOrgForm = (e) =>{
        if(findExistingOrg) {
            setFindExistingOrg(false);
        }

        setAddNewClientOrgState(!addNewClientOrgState);

        changeActiveButton(e);

 
    }



    const expandFindOrg = (e) => {
        if (addNewClientOrgState) {
            setAddNewClientOrgState(false);
        }

        setFindExistingOrg(!findExistingOrg);

        changeActiveButton(e);


    }

    const buttonContainer = useRef();

    const changeActiveButton = (e) => {

        let activeButton;

        //placed this in a try, because by default both button do not have the active.
        //so when finding an active button, it will return undefined and gives an error
        //when we try to remove it. It may be faster to just try and fail then to write
        //logic code.
        try {
            //First I used the useRef to get the the div I want to search. This will narrow down
            //what is to be search so that it will have better performance.
            //Then I convert the HTMLcollection into an array to use the find fuction to filter
            //the element with the class name I want.
            activeButton = Array.from(buttonContainer.current.children).find(item => item.classList.contains("active"));
                //if we click the same active button again, we want to make it not active.
                //so we can just toggle it.
            activeButton.classList.remove("active");
        } catch (error) {

            
        }

            //add active to the button that is clicked.

            if(e.target != activeButton){
                e.target.classList.toggle("active");
            }
           

    }

    const closeMainModal = () => {
        closeFindModal();
        //Need to do this so that the state resets to false whenever we close the modal
        setAddNewClientOrgState(false);
        setFindExistingOrg(false);
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

                <div className="client_org_modal_button" ref={buttonContainer}>
              
                        <button onClick={expandFindOrg}>Existing Client Organization</button>

                        <MountAndDismountAnimiation 
                        mountAnimiationClass={"open_form_modal"}
                        dismountAnimiationClass={"close_form_modal"}
                        isActive={findExistingOrg}>
                            <FindExistingOrg />
                            
                        </MountAndDismountAnimiation>



                        <button onClick={expandNewClientOrgForm}>New Client Organization</button>

             
                        <MountAndDismountAnimiation 
                        mountAnimiationClass={"open_form_modal"}
                        dismountAnimiationClass={"close_form_modal"}
                        isActive={addNewClientOrgState}>
                                <AddNewClientOrgForm />
                            
                        </MountAndDismountAnimiation>

               
              
                </div>
            </div>

        </Modal>
    )
}

export default ClientOrgModal
