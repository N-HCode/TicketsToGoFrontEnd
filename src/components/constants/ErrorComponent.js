import React, {useReducer, useEffect, useState} from 'react'
import {ERRORACTIONS} from './Error'


const errorReducer = (state, action) =>{
    switch (action.actionType){
        // case ERRORACTIONS.passwordAction:
        //     console.log("ERROR IS HERE1")
        //     return {
        //         ...state,
        //         changePassword: !state.changePassword
        //     }
        case ERRORACTIONS.errorIsOn:
           
            return{
                ...state,
                doesExist: true,
                errorMessage: action.errorMessage
            }
        case ERRORACTIONS.clearErrors:
           
            return {
                ...state,
                doesExist: false,
                errorMessage: null
            }    
        default:
     
            return state;
    }
}

const ErrorComponent = ({errorState}) => {

    const [error, errorDispatch] = useReducer(errorReducer, {
        doesExist: false,
        errorMessage: null
    })
    
    const [shake, setShake] = useState(false);

    useEffect(() => {

        if (errorState.actionType === ERRORACTIONS.errorIsOn) {
            console.log("TRUE?")
            setShake(true);
        }
      
        errorDispatch({actionType: errorState.actionType, errorMessage: errorState.errorMessage})

    }, [errorState])


   
    return (
        <div>
            {error.doesExist && 
            
            <div className={shake?"error_message shake": "error_message"}
                onAnimationEnd={() => setShake(false)}>

                <p>{error.errorMessage}</p>
                
            </div>}
        </div>
    )
}

export default ErrorComponent
