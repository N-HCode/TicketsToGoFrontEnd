import React from 'react';
import Searchbar from './homepagecomponents/mainnav/SearchBar';
import MainNavOptions from './homepagecomponents/mainnav/MainNavOptions';
import PrimaryNavTabs from './homepagecomponents/primaryNav/PrimaryNavTabs';
import TemplateDropdown from './homepagecomponents/tickettemplateoptions/TemplateDropdown';
import CurrentTemplateOptions from './homepagecomponents/tickettemplateoptions/CurrentTemplateOptions';
import TicketTabList from './homepagecomponents/tickettab/TicketTabList';
import TickColumnList from './homepagecomponents/ticketcolumns/TicketColumnList';

const HomePage = () => {

    //need the const to create the function

    return (
        //Looks like there isn't a standard for naming html/css ids and classNamees.
        //https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classNamees
        <div id="main_container">

            {/* Whole header container: has the top nav and the tabs */}
            <div id="header_container">

                {/* main nav and search bar */}
                <div id="main_nav">

                    <Searchbar/>
                    <MainNavOptions/>

                </div>
            </div>

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
                <TickColumnList />
            </div>

            {/* Footer if needed*/}
            <div id="footer">
                Footer
            </div>


        </div>
    )
}

export default HomePage
