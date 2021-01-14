import React, {useState, useRef} from 'react'

const InformationScreen = ({title, data, add, remove}) => {

    const [addingNewData, setAddingNewData] = useState(false)

    const currentAddInput = useRef();


    const onAddBtnClick = () => {
        
        setAddingNewData(!addingNewData);
    }

    const onEnterInAddInput = (e) => {
       
        //keyCode is depreicated, using key instead. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        if (e.key === "Enter") {
            console.log(currentAddInput.current.value)
           
            //This is the logic that make sure we don't put in duplicate status
            if (data.includes(currentAddInput.current.value)) {
                // setAddingNewData(false);
                return console.log("data already exist");
            }


            add(currentAddInput.current.value);
            console.log("enter key pressed");
            setAddingNewData(false);

        }

    }

    const onRemoveBtnClick = (e, index) => {
        //put in the index and the string
        remove(index,e.target.parentNode.querySelector('div').innerHTML);
    }



    return (
        <div className="information_screen_container">
            <div className="info_title">{title}
            
                <span>
                    <i className="material-icons" onClick={onAddBtnClick}>add</i>
                </span>

            </div>
            <div className="info_data">
                <ul>
                    { 
                        data.map((currentData, index) => 
                            
                            <li key ={title +"_data_" + index} >
                            
                                <div>{currentData}</div>
                                <i className="material-icons" onClick={(e) => onRemoveBtnClick(e, index)}>remove</i>
                            </li>
                        )
                    }

                    {addingNewData && 
                        <li>
                            <input type="text" onKeyDown={onEnterInAddInput} ref={currentAddInput}></input>
                        </li>
                    }



                </ul>


            </div>
            <div></div>

            
        </div>
    )
}

export default InformationScreen
