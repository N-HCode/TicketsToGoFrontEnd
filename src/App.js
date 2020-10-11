import React from 'react';
import logo from './logo.svg';
import './App.css';

// The Router library used to navigate the site
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

// Components from the applicaiton
import EditTicketPage from './components/ticket/EditTicketPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

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


  //The render is required for all react classes
  render() {
    return(
      <div>
      {/* {this is the router for changing pages on the site} */}
      <BrowserRouter>

        {/* {importing the Navbar component to navigate} */}
        <Navbar/>

        {/* {creating a switch to swap out the component to show when on different pages} */}
        <Switch>

          {/* {pages and the component assgined to them} */}
          <Route path="/edit" component={EditTicketPage} />
          <Route exact path="/" component={HomePage} />

          {/* {a redirect incase we need it} */}
          <Redirect from= "/" to="/" /> 

        </Switch>

      </BrowserRouter>
    </div>
    );
  }
}

export default App;
