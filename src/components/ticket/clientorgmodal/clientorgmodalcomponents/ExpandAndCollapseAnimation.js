import React, {useState, useEffect, useRef} from 'react'

const ExpandAndCollapseAnimation = ({isActive, children}) => {

    //we seperate the animation out to its own component so that we can wrap it around whichever component we want.
    //This will help us seperate the animation logic as well as let us put this animation on other components if we want

    //This state is to control the mount and dismount. While the isActive will control the animation.
    //We want them to be seperate because we need the dismount to happen AFTER the animation.
    const [state, setState] = useState(isActive);

    //This useEffect is to remount the component after it get dismounted. Thus playing the mount animation
    useEffect(() => {
        if(isActive) setState(true);
    }, [isActive])


    const animiationDiv = useRef();

    //This is the logic to unmount the component.
    //when isActive is false, it is the signal to play the dismount animation
    //This onAnimiationEnd will run whether it is mount or dismount.
    //We only want to unmount when isActive is false so we have a logic that only run if isActive is false
    const onAnimationEnd = () => {
        if(!isActive){

            setState(false);
            //Just in case the setState takes longer than the animation end.
            //We will make the component invisible until it gets unmounted so that it does not look jarring
            animiationDiv.current.style.display = "none";

        } 
    }



    return (
        //state will be the one that control the mount and dismount
        state &&
        // This is an example of the isActive controling the animation
        <div className={isActive? "open_form_modal" : "close_form_modal"}
            onAnimationEnd={onAnimationEnd}
            ref={animiationDiv}
        >


            { children}
            
        </div>
    )
}

export default ExpandAndCollapseAnimation
