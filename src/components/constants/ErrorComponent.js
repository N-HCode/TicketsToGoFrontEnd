import React, {useReducer} from 'react'

const errorReducer = (state, action) =>{
    switch (action.type){
        case "password":
            return {
                ...state,
                changePassword: !state.changePassword
            }
        case "error":
            return{
                ...state,
                error: true,
                errorMessage: action.errorMessage
            }
        case "clearErrors":
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





    return (
        <div>
            {error.doesExist && <div className="error_message"><p>{error.errorMessage}</p></div>}
        </div>
    )
}

export default ErrorComponent
