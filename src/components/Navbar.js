import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'

// NavLinks for styling and isActive option
import {NavLink} from 'react-router-dom'

const Navbar = () => {

    const [user] = useContext(UserContext);
    const buttonForTest = () => {
        console.log(user)
    }

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
                        style={{color: 'white'}}
                        >
                            Home
                    </NavLink>
                </li>
                
                <li> 
                    <NavLink 
                        to="/createTicket"
                         // {this is for when css gets made but for now using activeStyle
                         className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        style={{color: 'white'}}
                        >
                            CreateTicket
                    </NavLink>
                </li>

                <li> 
                    <NavLink 
                        to="/login"
                         // {this is for when css gets made but for now using activeStyle
                         className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        style={{color: 'white'}}
                        >
                            Login
                    </NavLink>
                </li>

                <li> 
                    <NavLink 
                        to="/signUp"
                         // {this is for when css gets made but for now using activeStyle
                         className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        style={{color: 'white'}}
                        >
                            SignUp
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/createOrganization"
                        // {this is for when css gets made but for now using activeStyle
                        className="inactive" activeClassName="active"
                        activeStyle={{ color: 'teal' }}
                        style={{color: 'white'}}
                        >
                            createOrganization
                    </NavLink>
                </li>
            </ul>
            <button onClick={buttonForTest}>state of user</button>
        </nav>
    )
}

export default Navbar
