import React from 'react'
import TicketList from './ticket/TicketList';
import Searchbar from './homepagecomponents/mainnav/SearchBar';
import MainNavOptions from './homepagecomponents/mainnav/MainNavOptions';
import PrimaryNavTabs from './homepagecomponents/primaryNav/PrimaryNavTabs';
import TemplateDropdown from './homepagecomponents/tickettemplate/TemplateDropdown';


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


                <MainNavTabs />
                <PrimaryNavTabs />


                <div className="tab_line"></div>
            </div>
            


            {/* Whole container for ticket template */}
            <div id="template_container">
                {/* template selection */}
                <div className="template_options">
                   
                    <TemplateDropdown/>

  
                    <div className="template_icon_menus">
                        <div>
                            <i className="material-icons">settings</i>
                            <i className="material-icons">people</i>
                        </div>

                        <i className="material-icons">delete_forever</i>
                    </div>
                </div>

                {/* tab line */}
                <div className="tab_line"></div>

                {/* ticket tabs */}
                <div id="ticket_tab_container">
                    <div className="single_ticket_tab">
                        <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                        <a className="material-icons">close</a>
                    </div>

                    <div className="single_ticket_tab">
                        <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                        <a className="material-icons">close</a>
                    </div>

                    <div className="single_ticket_tab">
                        <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                        <a className="material-icons">close</a>
                    </div>

                    <div className="single_ticket_tab">
                        <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                        <a className="material-icons">close</a>
                    </div>

                </div>

                {/* Ticket column container */}
                <div id="ticket_columns_container">
                    <div className="single_ticket_column">
                        <div className="column_title">
                            <i className="material-icons">edit</i>
                            <p>TITLE HERE</p>
                            <i className="material-icons">add</i>
                        </div>
                        <div className="ticket_list_container">
                            Template/TicketList
                            <TicketList />
                        </div>

                    </div>


                </div>
            </div>

            {/* Footer if needed*/}
            <div id="footer">
                Footer
            </div>


        </div>
    )
}

export default HomePage
