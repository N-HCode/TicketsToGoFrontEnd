import React, {useContext} from 'react';
import PrimaryNavTabs from './homepagecomponents/primaryNav/PrimaryNavTabs';
import TicketTemplateContainer from './homepagecomponents/tickettemplatecontainer/TicketTemplateContainer';
import { PrimaryNavSelectedContext } from './context/PrimaryNavSelectedContext';
import {loginAPI} from '../services/UserService'

// import {PRIMARYCOMPONENTS} from './constants/Components';



const HomePage = () => {

    const [primaryNavSelectedContext] = useContext(PrimaryNavSelectedContext);
    const PRIMARYCOMPONENTS = [<TicketTemplateContainer/>]

    //need the const to create the function




    return (
        //Looks like there isn't a standard for naming html/css ids and classNamees.
        //https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classNamees
        <div className="main_container">
            {/* <button onClick={test1}>tset</button>
            <button onClick={test2}>tse2t</button> */}
            {/* primary tab bar */}
            {/* <div id="primary_tab"> */}


            <div
            
            style={
                {
                    "margin-bottom": "50px",
                }
            }
            
            >
                
                <PrimaryNavTabs/>


                {/* <div className="tab_line"></div>
                </div> */}

                { primaryNavSelectedContext.index >= 0 &&

                    PRIMARYCOMPONENTS[primaryNavSelectedContext.array[primaryNavSelectedContext.index].type]
                
                }
            </div>



            {/* Footer if needed*/}
            <div id="footer">
                Created By: N-HCode
            </div>


        </div>
    )
}

export default HomePage
