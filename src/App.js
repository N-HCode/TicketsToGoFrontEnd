import React from 'react';
// The Router library used to navigate the site
import { BrowserRouter, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';

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

import {StatusListProvider} from './components/context/StatusListContext';

import {PriorityListProvider} from './components/context/PriorityListContext';


import {VerifyStatusProvider} from './components/context/VerifyStatusContext';

import {SelectedOrgProvider} from './components/context/SelectedOrgContext'



import {AllRoutes} from './routing/AllRoutes';





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



  //The render is required for all react classes
  render() {
    return(
      <div>
      {/* {this is the router for changing pages on the site} */}
      <BrowserRouter history={history}>
        {/* The Main Context Providers */}
        <UserProvider>
          <OrganizationProvider>
          <VerifyStatusProvider>
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
                        <SelectedOrgProvider>
                        

                        
                        {/* {creating a switch to swap out the component to show when on different pages} */}
                          
                          {/* {pages and the component assgined to them} */}
                  
                          <Route component={AllRoutes}/>

                          </SelectedOrgProvider>
                        
                      </TicketTabContextProvider>
                      
                      </TicketProvider>
                    </TicketColumnsContextProvider>
                  </PriorityListProvider>
                </StatusListProvider>
              </OpenTicketContextProvider>
              </PrimaryNavSelectedProvider>
              </VerifyStatusProvider>
            </OrganizationProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
