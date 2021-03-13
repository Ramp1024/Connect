import React from 'react'
import Axios from "./Axios";
import $ from "jquery"

function SignUp() {

    const handleClick = () => {
        Axios.post("/verify", {
            email: $(".signup-user")
        })
            .then(res => console.log(res))
    }

    return (
        <div>
            <input type="text" placeholder="User" className="signup-user" />
            {/* <input type="text" placeholder="Password" name="password" /> */}
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default SignUp