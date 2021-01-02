import React, {useState, useRef} from 'react'

const InformationScreen = ({title, data, add, remove}) => {


    const currentlyActive = useRef();
    const currentIndex = useRef();

    const onDataClick = (e, index) => {

        if (currentlyActive.current != undefined) {
            currentlyActive.current.classList.remove("active");
        }
        
        currentlyActive.current = e.currentTarget;
        currentIndex.current = index;
        e.currentTarget.classList.add("active");

    }

    const onAddBtnClick = () => {


    }

    const onRemoveBtnClick = () => {
        console.log(currentlyActive.current.children[0].innerHTML);

        if (currentlyActive.current != undefined) {
            remove(currentIndex.current,currentlyActive.current.children[0].innerHTML);
        }
    }



    return (
        <div className="information_screen_container">
            <div className="info_title">{title}
            
                <span>
                    <i className="material-icons" onClick={onRemoveBtnClick}>remove</i>
                    <i className="material-icons" onClick={onAddBtnClick}>add</i>
                </span>

            </div>
            <div className="info_data">
                <ul>
                {

                    
                    data.map((currentData, index) => 
                        
                        <li key ={title +"_data_" + index} onClick={(e) => onDataClick(e, index)}>
                        
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
