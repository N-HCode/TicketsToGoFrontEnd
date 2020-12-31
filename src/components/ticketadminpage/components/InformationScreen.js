import React from 'react'

const InformationScreen = ({title, data}) => {



    return (
        <div className="information_screen_container">
            <div className="info_title">{title}
            
                <span>
                    <i className="material-icons">remove</i>
                    <i className="material-icons">add</i>
                </span>

            </div>
            <div className="info_data">
                {/* <table>
                    <tbody>
                    {

                    
                        data.map((currentData, index) => 
                            
                            <tr>
                               
                                <td><div>{currentData}</div></td>
                            </tr>


                        )


                    }



                    </tbody>

                </table> */}


                <ul>
                {

                    
                    data.map((currentData, index) => 
                        
                        <li key ={title +"_data_" + index}>
                        
                            <div>{currentData}</div>
                        </li>


                    )


                }


                </ul>


            </div>
            <div></div>

            
        </div>
    )
}

export default InformationScreen
