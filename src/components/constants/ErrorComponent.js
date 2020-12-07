import React, {useReducer} from 'react'

const errorReducer = (state, action) =>{
    switch (action.type){
        case ERRORACTIONS.passwordAction:
            return {
                ...state,
                changePassword: !state.changePassword
            }
        case ERRORACTIONS.errorIsOn:
            return{
                ...state,
                error: true,
                errorMessage: action.errorMessage
            }
        case ERRORACTIONS.clearErrors:
            return {
                ...state,
                error: false,
                errorMessage: null
            }    
        default:
            return state;
    }
}

const ErrorComponent = () => {

    const [error, errorDispatch] = useReducer(errorReducer, {
        doesExist: false,
        errorMessage: null
    }) 

    const ERRORACTIONS = {
        passwordAction : "password",
        errorIsOn: "error",
        clearErrors: "clearErrors",
    }





    return (
        <div>
            {error.doesExist && <div className="error_message"><p>{error.errorMessage}</p></div>}
        </div>
    )
}

export default ErrorComponent
