import React, {useState, useContext} from 'react';
import PrimaryNavTabs from './homepagecomponents/primaryNav/PrimaryNavTabs';
import TicketTemplateContainer from './homepagecomponents/tickettemplatecontainer/TicketTemplateContainer';
import { PrimaryNavSelectedContext } from './context/PrimaryNavSelectedContext';



const HomePage = () => {

    const [ticketIsOpen, setTicketIsOpen] = useState(false);

    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);


    //Modal functions to open and close.

    const openTicketModal = () => {
        setTicketIsOpen(true);
    }

    const closeTicketModal = () => {
        setTicketIsOpen(false);
    }


    //need the const to create the function

    return (
        //Looks like there isn't a standard for naming html/css ids and classNamees.
        //https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classNamees
        <div className="main_container">



            {/* primary tab bar */}
            {/* <div id="primary_tab"> */}


                <PrimaryNavTabs />


                {/* <div className="tab_line"></div>
            </div> */}

            {primaryNavSelectedContext.array.length > 0 
            && 
            primaryNavSelectedContext.index < primaryNavSelectedContext.array.length
            &&
            primaryNavSelectedContext.array[primaryNavSelectedContext.index]
            }

    

            {/* Whole container for ticket template }
            <div className="template_container">
                {/* template selection }
                <div className="template_options">
                   
                    
                    <TemplateDropdown/>
                    <CurrentTemplateOptions/>
  

                </div>

                {/* tab line }
                <div className="tab_line"></div>

                {/* ticket tabs }
                < TicketTabList openTicketModal={openTicketModal}/>

                {/* Ticket column container }

                {/* <button onClick={openTicketModal}>Change</button> }

                <TicketColumnList openTicketModal={openTicketModal}/>

                {ticketIsOpen && <TicketInfo ticketIsOpen={ticketIsOpen} closeTicketModal={closeTicketModal}/>}

                
            </div> */}

            {/* Footer if needed*/}
            <div id="footer">
                Footer
            </div>


        </div>
    )
}

export default HomePage
