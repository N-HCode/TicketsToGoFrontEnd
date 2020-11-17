import React, { useState, useContext } from 'react';
// NavLinks for styling and isActive option
import {NavLink} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TicketContext } from '../../context/TicketContext';

const MainNavOptions = () => {

    const [user, setUser] = useContext(UserContext);
    const [tickets, setTickets] = useContext(TicketContext);

    const logOut = () => {
        setUser({})
        setTickets({})
    }


    const [navMenuOpen, setNavMenuOpen] = useState(false);

    const NavDropDown = (props) =>{

        return (
            <div id="main_nav__drop_down">
                <i className="material-icons" 
                onClick={() => setNavMenuOpen(!navMenuOpen)} >menu</i>

                {/* if nav menu is true it will show the children.
                Otherwise it will not. Makes it easy to create a
                dropdown on/off*/}
                {navMenuOpen && props.children}

                
            </div>
        )
    }

    return (
        <nav id="main_nav__menu_container">
            <NavDropDown>
                <div className="dropdown">
                    <NavLink to="/createTicket" className="dropdown_menu_item">Create Ticket</NavLink>
                    <NavLink to="/login" className="dropdown_menu_item">Log in</NavLink>
                    <NavLink to="/signUp" className="dropdown_menu_item">Sign up</NavLink>
                    <NavLink to="/createOrganization" className="dropdown_menu_item">Create Organization</NavLink>
                    <NavLink to="/myaccount" className="dropdown_menu_item">My Account</NavLink>
                    <NavLink to="#" className="dropdown_menu_item">Admin</NavLink>
                    <NavLink 
                    to="/login" 
                    className="dropdown_menu_item"
                    onClick={logOut}
                    >Log out</NavLink>

                </div>
            </NavDropDown>
            
        </nav>
    )


}

export default MainNavOptions;