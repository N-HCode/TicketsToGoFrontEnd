import React from 'react'
import TicketList from './ticket/TicketList';

const HomePage = () => {
    return (
        //Looks like there isn't a standard for naming html/css ids and classNamees.
        //https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classNamees
        <div id="main_container">

            {/* Whole header container: has the top nav and the tabs */}
            <div id="header_container">

                {/* main nav and search bar */}
                <div id="main_nav">
                    <div id="main_nav__search_container">
                        <div id="main_nav__search_box">
                            <input  type="text" name="" placeholder="search"/>
                            <i className="material-icons">search</i> 
                        </div>

                    
                        <a href="#">Advance Search</a>

                    </div>

                    <div id="main_nav__menu_container">
                        Log out
                        menu
                    </div>

                </div>


                {/* primary tab bar */}
                <div id="primary_tab">

                    <div id="primary_tab__tab_container">
                        <div className="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a className="material-icons">close</a>
                        </div>

                        <div className="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a className="material-icons">close</a>
                        </div>

                        <div className="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a className="material-icons">close</a>
                        </div>

                        <div className="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a className="material-icons">close</a>
                        </div>

                        <div className="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a className="material-icons">close</a>
                        </div>

                        <i className="material-icons">add</i>
 
                    </div>

                    <div className="tab_line"></div>
                </div>
            </div>


            {/* Whole container for ticket template */}
            <div id="template_container">
                {/* template selection */}
                <div>

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
                        Template/TicketList
                        <TicketList />
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
