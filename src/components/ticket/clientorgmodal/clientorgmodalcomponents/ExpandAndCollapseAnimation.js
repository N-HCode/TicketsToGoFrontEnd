import React, {useState, useEffect} from 'react'

const ExpandAndCollapseAnimation = ({isActive, children}) => {

    //we seperate the animiation out to its own component so that we can wrap it around whichever component we want.
    //This will help us seperate the animiation logic as well.

    //This state is to control the mount and dismount. While the isActive will control the animiation.
    //We want them to be seperate because we need the dismount to happen AFTER the animation.
    const [state, setState] = useState(isActive);

    //This useEffect is to remount the component after it get dismounted. Thus playing the mount animiation
    useEffect(() => {
        if(isActive) setState(true);
    }, [isActive])


    //This is the logic to unmount the component.
    //when isActive is false, it is the signal to play the dismount animation
    //This onAnimiationEnd will run whether it is mount or dismount.
    //We only want to unmount when isActive is false so we have a logic that only run if isActive is false
    const onAnimationEnd = () => {
        if(!isActive) setState(false);
    }



    return (

        state &&
        <div className={isActive? "open_form_modal" : "close_form_modal"}
            onAnimationEnd={onAnimationEnd}
        >

            { children}
            
        </div>
    )
}

export default ExpandAndCollapseAnimation
