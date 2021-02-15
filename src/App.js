import React from 'react';
// The Router library used to navigate the site
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components for Tickets
import HomePage from './components/HomePage';
import CreateTicketPage from './components/ticket/CreateTicketPage';
import MainNavBar from './components/homepagecomponents/mainnav/MainNavBar'

// Components for Organization
import CreateOrganization from './components/organization/CreateOrganizationPage';

// Components for User
import LoginPage from './components/user/LoginPage';
import UserList from './components/user/UserList';
import EditUserPage from './components/user/EditUserPage';

// Context for User
import { UserProvider } from './components/context/UserContext';
// Context for Organization
import { OrganizationProvider } from './components/context/OrganizationContext';

// Context for Primary Nav
import { PrimaryNavSelectedProvider } from './components/context/PrimaryNavSelectedContext'

// Context for Tickets
import { TicketProvider} from './components/context/TicketContext';

// Context for TicketTab
import { TicketTabContextProvider } from './components/context/TicketTabContext';

import {TicketColumnsContextProvider} from './components/context/TicketColumnsContext';

import {OpenTicketContextProvider} from './components/context/OpenTicketContext';

import {StatusListProvider} from './components/context/StatusListContext'

import {PriorityListProvider} from './components/context/PriorityListContext'

// My Account page
import MyAccountPage from './components/myaccountpage/MyAccount';

// Admin page
import AdminPage from './components/adminpage/AdminPage';

// Ticket Admin page

import TicketAdminPage from './components/ticketadminpage/TicketAdminPage';

// import { createOrganization } from './services/OrganizationService';

//importing the paths constants
import {PATHS, NoNavPATHS} from './routing/Paths'

//Protected Routing
import ProtectedRoute from './routing/ProtectedRoute';

//Error page
import ErrorPage from './components/error/ErrorPage'





const history = createBrowserHistory();
class App extends React.Component {

  //appConfig is used to apply configuration to the react program.
  //This is different to state, as state constantly changes with the setState.
  //Configurations do not change very often and something.
  //This helps to keep some settings at the top level instead of the component level.
  //So we can easily test changes in one location.
  appConfig = {
      
  }


  //the state of the program. This will usually hold data that are constantly
  //changing. We need a state to temporarily keep data that need to be referred
  //to at a later time, but will also be changing a lot.
  state = {

  }

  //this is the function section.
  RouteWithNav = () => {

    return(
  
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



  //The render is required for all react classes
  render() {
    return(
      <div>
      {/* {this is the router for changing pages on the site} */}
      <BrowserRouter history={history}>
        {/* The Main Context Providers */}
        <UserProvider>
          <OrganizationProvider>
          <PrimaryNavSelectedProvider>
            <OpenTicketContextProvider>
              <StatusListProvider>
                <PriorityListProvider>
                  <TicketColumnsContextProvider>
                    <TicketProvider>
                      {/* {Navbar component to navigate} */}
                      {/* <Navbar/> */}
                      
                      
                      {/* TicketTabContext to hold the ticket tabs*/}
                      <TicketTabContextProvider>

                        
                        {/* {creating a switch to swap out the component to show when on different pages} */}
                          
                          {/* {pages and the component assgined to them} */}
                  
                          <Route component={this.RouteWithNav}/>

                      </TicketTabContextProvider>
                      
                      </TicketProvider>
                    </TicketColumnsContextProvider>
                  </PriorityListProvider>
                </StatusListProvider>
              </OpenTicketContextProvider>
              </PrimaryNavSelectedProvider>
            </OrganizationProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
