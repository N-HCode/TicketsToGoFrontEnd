import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';
import {NoNavPATHS} from './Paths';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} 
            render={

                
                (props) => {
                    //if authenticated then we will load the component
                    if (Auth.authenticated) {
             
                        return <Component {...props}/>
                    } else {
                    //else we redirect to the login page
                    //The to takes an object
  
                        return <Redirect to={
                            {
                                pathname: NoNavPATHS.login,
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }

                    
                }
            }
        
        />

    )
}

export default ProtectedRoute
