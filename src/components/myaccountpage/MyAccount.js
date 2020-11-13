import React, {useRef, useReducer} from 'react'

const MyAccount = () => {


    const navbar = useRef();

    return (
        <div className="main_container">
            <div id="my_account_page_container">

                <div id="my_account_nav_menu_container">
                    <ul className="my_account_nav_menu" ref={navbar}>
                        <li><i className="material-icons">lock</i>Security</li>
                        <li className="active_tab">Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                    </ul>

                </div>

                <div className="single_page_container">

                </div>

            </div>
        </div>
    )
}

export default MyAccount
