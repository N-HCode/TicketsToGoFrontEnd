import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';
import {PATHS} from './Paths';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} 
            render={

                
                (props) => {
                    //if authenticated then we will load the component
                    if (Auth.authenticated) {
                        console.log("YOIRHUIOHBRFUSD")
                        return <Component {...props}/>
                    } else {
                    //else we redirect to the login page
                    //The to takes an object
                    console.log("YOIRHUIOHBRFUSD")
                        return <Redirect to={
                            {
                                pathname: "/login",
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
