import React from 'react';
import logo from './logo.svg';
import './App.css';

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
    <div id="main_container">

        {/* Whole header container: has the top nav and the tabs */}
        <div>
          {/* main nav and search bar */}
          <div>

          </div>

          {/* primary tab bar */}
          <div>

          </div>
        </div>


        {/* Whole container for ticket template */}
        <div>
          {/* template selection */}
          <div>

          </div>

          {/* ticket tabs */}
          <div>

          </div>

          {/* Ticket column container */}
          <div>

          </div>
        </div>

        {/* Footer if needed*/}

        <div id="test">Hello world</div>
        <div id="test2">World hello</div>
   

    </div>
    );
  }

  //react lifecycles menthods: https://reactjs.org/docs/react-component.html

}

export default App;
