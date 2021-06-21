import React, { useState, useContext } from 'react';
// NavLinks for styling and isActive option
import {NavLink} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TicketContext } from '../../context/TicketContext';
import { OrganizationContext} from '../../context/OrganizationContext';
import {logoutApplication} from '../../../services/RefreshAndLogoutService';
import { useHistory } from "react-router-dom";
import {NoNavPATHS} from "../../../routing/Paths"
import {Auth} from '../../../routing/Auth';


const MainNavOptions = () => {

    const [user, setUser] = useContext(UserContext);
    const [tickets, setTickets] = useContext(TicketContext);
    const [organization, setOrganization] = useContext(OrganizationContext);

    const history = useHistory();

    const logOut = async() => {

        closeMenu();
        setUser({});
        setTickets({});
        setOrganization({});
        Auth.logout();

        try {
            //we isolated this because we still want the rest to run even if the
            //API token is expired or just not working.
            await logoutApplication();
        } catch (error) {   
        }

        history.push(NoNavPATHS.login);
        //reloading the session will clear a lot of the session data.
        window.location.reload();
        
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
                    <NavLink to="/ticketadmin" className="dropdown_menu_item" onClick={closeMenu}>Ticket Admin</NavLink>
                    

                </div>
            </NavDropDown>
            
        </nav>
    )


}

export default MainNavOptions;