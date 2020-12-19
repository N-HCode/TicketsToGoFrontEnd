import React, {useState, useRef} from 'react';
import PrimaryNavTabs from './homepagecomponents/primaryNav/PrimaryNavTabs';
import TemplateDropdown from './homepagecomponents/tickettemplateoptions/TemplateDropdown';
import CurrentTemplateOptions from './homepagecomponents/tickettemplateoptions/CurrentTemplateOptions';
import TicketTabList from './homepagecomponents/tickettab/TicketTabList';
import TicketColumnList from './homepagecomponents/ticketcolumns/TicketColumnList';
import TicketInfo from './homepagecomponents/ticketinfo/TicketInfo';




const HomePage = () => {

    const [ticketIsOpen, setTicketIsOpen] = useState(false);


    //Modal functions to open and close.

    const onClick = () => {
        setTicketIsOpen(!ticketIsOpen);

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
            <div id="primary_tab">


                <PrimaryNavTabs />


                <div className="tab_line"></div>
            </div>
            


            {/* Whole container for ticket template */}
            <div id="template_container">
                {/* template selection */}
                <div className="template_options">
                   
                    
                    <TemplateDropdown/>
                    <CurrentTemplateOptions/>
  

                </div>

                {/* tab line */}
                <div className="tab_line"></div>

                {/* ticket tabs */}
                < TicketTabList />

                {/* Ticket column container */}

                <button onClick={onClick}>Change</button>

                <TicketColumnList />

                {ticketIsOpen && <TicketInfo ticketIsOpen={ticketIsOpen} closeTicketModal={closeTicketModal}/>}

                
            </div>

            {/* Footer if needed*/}
            <div id="footer">
                Footer
            </div>


        </div>
    )
}

export default HomePage
