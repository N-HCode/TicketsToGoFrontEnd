import React from 'react';
// The Router library used to navigate the site
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components for Tickets
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
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

import { createOrganization } from './services/OrganizationService';





const history = createBrowserHistory();
class App extends React.Component {

  //appConfig is used to apply configuration to the react program.
  //This is different to state, as state constantly changes with the setState.
  //Configurations do not change very often and something.
  //This helps to keep some settings at the top level instead of the component level.
  //So we can easily test changes in one location.
  appConfig = {
      
  }

  paths = {
    editUser: "/editUser",
    createTicket: "/createTicket",
    login: "/login",
    createOrganization: "/createOrganization",
    userList: "/users",
    myAccount: "/myaccount",
    home: "/",
    adminPage: "/admin",
    ticketAdminPage: "/ticketadmin"
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
       
              {window.location.pathname.toLocaleLowerCase() === this.paths.login.toLocaleLowerCase() ||
              window.location.pathname.toLocaleLowerCase() === this.paths.createOrganization.toLocaleLowerCase()
              ? null : <MainNavBar/>}

              <Route exact path={this.paths.editUser} component={EditUserPage} />
              <Route exact path={this.paths.createTicket} component={CreateTicketPage} />
              <Route exact path={this.paths.login} component={LoginPage} />
              <Route exact path={this.paths.createOrganization} component={CreateOrganization} />
              <Route exact path={this.paths.userList} component={UserList} />
              <Route exact path={this.paths.myAccount} component={MyAccountPage} />
              <Route exact path={this.paths.home} component={HomePage} />
              <Route exact path={this.paths.adminPage} component={AdminPage} />
              <Route exact path={this.paths.ticketAdminPage} component={TicketAdminPage} />


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
                        <Switch>
                          {/* {pages and the component assgined to them} */}
                          
                          <Route component={this.RouteWithNav}/>


                          {/* {a redirect for anypage not listed above} */}
                          <Redirect from= "/" to="/" /> 
                        </Switch>
                        

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
