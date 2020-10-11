import React from 'react'

// NavLinks for styling and isActive option
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li> 
                    <NavLink 
                        to="/"
                        exact={true}
                        // {this is for when css gets made but for now using activeStyle
                        className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        >
                            Home
                    </NavLink>
                </li>
                
                <li> 
                    <NavLink 
                        to="/edit"
                         // {this is for when css gets made but for now using activeStyle
                         className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        >
                            EditTicket
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
