import React, { useState, useContext } from 'react';
// NavLinks for styling and isActive option
import {NavLink} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TicketContext } from '../../context/TicketContext';
import { OrganizationContext} from '../../context/OrganizationContext';


const MainNavOptions = () => {

    const [user, setUser] = useContext(UserContext);
    const [tickets, setTickets] = useContext(TicketContext);
    const [organization, setOrganization] = useContext(OrganizationContext);

    const logOut = () => {
        closeMenu();
        setUser({});
        setTickets({});
        setOrganization({});
        
    }


    const [navMenuOpen, setNavMenuOpen] = useState(false);

    const closeMenu = () => {
        setNavMenuOpen(false);
    }

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
                    <NavLink to="/createTicket" className="dropdown_menu_item" onClick={closeMenu}>Create Ticket</NavLink>
                    <NavLink to="/login" className="dropdown_menu_item" onClick={closeMenu}>Log in</NavLink>
                    <NavLink to="/createOrganization" className="dropdown_menu_item"onClick={closeMenu}>Create Organization</NavLink>
                    <NavLink to="/myaccount" className="dropdown_menu_item"onClick={closeMenu}>My Account</NavLink>
                    <NavLink to="/admin" className="dropdown_menu_item" onClick={closeMenu}>Admin</NavLink>
                    <NavLink to="/admin" className="dropdown_menu_item" onClick={closeMenu}>Organization List</NavLink>
                    <NavLink to="/" className="dropdown_menu_item" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/login" className="dropdown_menu_item" onClick={logOut}>Log out</NavLink>
                    <NavLink to="/ticketadmin" className="dropdown_menu_item" onClick={logOut}>Ticket Admin</NavLink>
                    

                </div>
            </NavDropDown>
            
        </nav>
    )


}

export default MainNavOptions;