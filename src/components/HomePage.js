import React from 'react'
import TicketList from './ticket/TicketList';

const HomePage = () => {
    return (
        //Looks like there isn't a standard for naming html/css ids and classes.
        //https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classes
        <div id="main_container">

            {/* Whole header container: has the top nav and the tabs */}
            <div id="#header_container">

                {/* main nav and search bar */}
                <div id="main_nav">
                    <div id="main_nav__search_container">
                        <input id="main_nav__search_box" type="text" name="" placeholder="search">

                        </input>
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
                        <div class="primary_tab__singletab">
                            <p>Testfdfsafadsadasdadsfdsfsdfdss</p>
                            <a class="material-icons">close</a>
                        </div>

                        <div class="primary_tab__singletab">
                            <p>Testafefafaefaefaefaefaefefa</p>
                        </div>

                        <div class="primary_tab__singletab">
                            <p>Test</p>
                        </div>
                    </div>

                    <div id="primary_tab__tab_line"></div>
                </div>
            </div>


            {/* Whole container for ticket template */}
            <div id="template_container">
                {/* template selection */}
                Template/TicketList

                <TicketList />

                {/* ticket tabs */}
                <div>

                </div>

                {/* Ticket column container */}
                <div>

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
