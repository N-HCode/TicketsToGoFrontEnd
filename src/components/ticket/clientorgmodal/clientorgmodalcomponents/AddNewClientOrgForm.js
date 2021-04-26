import React, {useState, useEffect, useRef} from 'react'

const AddNewClientOrgForm = ({signalAddNewClientCloseState,setSignalAddNewClientCloseState, setAddNewClientOrgState}) => {

    const [clientOrgInfoState, setClientOrgInfoState] = useState(
        {
            isForeignAddress: null,
            city: null,
            state: null,
            streetAddress: null,
            zipcode: null,
            country: null,
            organizationPhoneNumber: null,
        }
        
    )

    const [state, setstate] = useState(false)

    const onChangeCheckBox = (e) => {

        //We use the .checked for checkboxes to get true or false on whether it is checked
        setClientOrgInfoState({
            ...clientOrgInfoState,
            [e.target.name]: e.target.checked
        });
    }

    const onChange = (e) => {
        setClientOrgInfoState({
            ...clientOrgInfoState,
            [e.target.name]: e.target.value
        });
    }

    const closeForm = () => {
  
        //This display set to none is placed here because the setState is aynsc.
        //Meaning that the component may take a while to dismount even AFTER the animation is over.
        //So to make sure the dismount animation look smooth, we need to make the display to be none
        //as soon as the animation is over. Then we can dismount the component while it is invisible.
        formModalRef.current.style.display = "none";

        //Since the component will be dismounted we do not need to set this to false. As when we
        //remount it the state will be defaulted to false again.
        setstate(true);
    }

    const formModalRef = useRef();

    useEffect(() => {
        if (state) {
            //React will not allow you to change the state of one component from another component.
            //You will get the Cannot update Component error message.
            //In rare cases you can bypass this by putting it in a useEffect.
            //I want this to get dismount this component after the animation end, 
            //and the rendering depends on the state of the parent component, so I believe this is valid.
            setSignalAddNewClientCloseState(false)
            setAddNewClientOrgState(false);
        }

    }, [state])




    return (
        <div className={signalAddNewClientCloseState?"form_modal close_form_modal" :"form_modal open_form_modal"}
        // So animation will only play when the component is mounted. TO make react see that this is a different
        // component from an earlier component, we need to change the key. So now when we change the class,
        // the new animation will play as well.
            key={signalAddNewClientCloseState?1:2}
            onAnimationEnd={signalAddNewClientCloseState?() => closeForm(): null}
            ref={formModalRef}
        >
            <div>
                <label htmlFor="isForeignAddress">Foreign Address?:</label>
                <input  type="checkbox" required name="isForeignAddress" onChange={onChangeCheckBox}></input>

            </div>


            <label htmlFor="city">City:</label>
            <input  type="text" required name="city" onChange={onChange}></input>

            <label htmlFor="state">State:</label>
            <input  type="text" required name="state" onChange={onChange}></input>

            <label htmlFor="streetAddress">Address:</label>
            <input  type="text" required name="streetAddress" onChange={onChange}></input>

            <label htmlFor="zipcode">Zipcode:</label>
            <input  type="text" required name="zipcode" onChange={onChange}></input>

            <label htmlFor="country">Country:</label>
            <input  type="text" required name="country" onChange={onChange}></input>

            <label htmlFor="organizationPhoneNumber">Phone # (Optional):</label>
            <input  type="text" name="organizationPhoneNumber" onChange={onChange}></input>
  
        </div>
    )
}

export default AddNewClientOrgForm
