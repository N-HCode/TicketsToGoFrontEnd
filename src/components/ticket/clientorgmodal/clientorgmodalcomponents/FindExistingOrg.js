import React, {useState} from 'react'

const FindExistingOrg = () => {

    const [keyword, setKeyword] = useState("")

    const onChange = (e) => {
        setKeyword(e.target.value)
    }

    const onSubmit = () => {

    }


    return (
        <form className="form_modal" onSubmit={onSubmit}>

            <label htmlFor="keyword">Search Term:</label>
            <input  type="text" required name="keyword"  value={keyword || ""} onChange={onChange}></input>

            <div className="client_org_modal_button form_submit_button">
                <button>Search</button>
            </div>
            
        </form>
    )
}

export default FindExistingOrg
