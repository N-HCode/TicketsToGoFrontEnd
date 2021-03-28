import React, {useContext} from 'react';
// The Router library used to navigate the site
import { Switch, Route} from 'react-router-dom';


// Components for Tickets
import HomePage from '../components/HomePage';
import CreateTicketPage from '../components/ticket/CreateTicketPage';
import MainNavBar from '../components/homepagecomponents/mainnav/MainNavBar'

// Components for Organization
import CreateOrganization from '../components/organization/CreateOrganizationPage';

// Components for User
import LoginPage from '../components/user/LoginPage';
import UserList from '../components/user/UserList';
import EditUserPage from '../components/user/EditUserPage';


// My Account page
import MyAccountPage from '../components/myaccountpage/MyAccount';

// Admin page
import AdminPage from '../components/adminpage/AdminPage';

// Ticket Admin page

import TicketAdminPage from '../components/ticketadminpage/TicketAdminPage';

//Error page
import ErrorPage from '../components/error/ErrorPage';

//importing the paths constants
import {PATHS, NoNavPATHS} from './Paths';

//Protected Routing
import ProtectedRoute from './ProtectedRoute';
import {Auth} from './Auth';
import {VerifyStatusContext} from '../components/context/VerifyStatusContext';
import {verify} from '../services/UserService';

const AllRoutes = () => {

    const [isVerified, setIsVerified] = useContext(VerifyStatusContext);


    //this code use the verify endpoint which just returns a status 200 if they can reach it
    //We can use this to see if they currently have a valid token and if they do we set
    //authenticated to be true, so they will not have to relogin every time they refresh
    const verified = async () => {


        //this isVerified used here is to make this code only run once.
        if (!isVerified) {
            try {
              
                await verify();
                
                Auth.authenticated = true;
    
                setIsVerified(true);
                
                
            } catch (error) {
            
                Auth.authenticated = false;
                setIsVerified(true);
                
            }    
        } 


    }

    verified();



    return (
        <div>
        {/* The Object.value returns an array of all the values of the object */}
        {/* This makes it so that the Nav only show on certain paths */}
        {Object.values(PATHS).includes(window.location.pathname.toLocaleLowerCase())? <MainNavBar/> : null}

        <Switch>
          {/* Path with no Nav. Put it in a seperate object for easy Nav logic */}
          <Route exact path={NoNavPATHS.login} component={LoginPage} />
          <Route exact path={NoNavPATHS.createOrganization} component={CreateOrganization} />

          {/* Paths with Main Nav bar */}
          <ProtectedRoute exact path={PATHS.editUser} component={EditUserPage} />
          <ProtectedRoute exact path={PATHS.createTicket} component={CreateTicketPage} />
          <ProtectedRoute exact path={PATHS.userList} component={UserList} />
          <ProtectedRoute exact path={PATHS.myAccount} component={MyAccountPage} />
          <ProtectedRoute exact path={PATHS.home} component={HomePage} />
          <ProtectedRoute exact path={PATHS.adminPage} component={AdminPage} />
          <ProtectedRoute exact path={PATHS.ticketAdminPage} component={TicketAdminPage} />
          <ProtectedRoute component={ErrorPage}/>
        </Switch>
      </div>
    )
}

export  {AllRoutes}
