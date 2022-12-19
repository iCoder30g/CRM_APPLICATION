import React, { useState } from 'react'
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../styles/login.css"



const  Signup = (props) => {
    const { onSubmit, setShowSignupForm } = props
    /** state for sign-up component */
    const [signupUserId, setSignupUserId] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const [signupUserName, setSignupUserName] = useState("")
    const [signupEmail, setSignupEmail] = useState("")
    const [signupUserType, setSignupUserType] = useState("CUSTOMER")



    const handleSignupUserIdChange = (e) => {
        const value = e.target.value;
        setSignupUserId(value);
        console.log(value)
    }

    const handleSignupPasswordChange = (e) => {
        const value = e.target.value;
        setSignupPassword(value);
        console.log(value)
    }

    const handleSignupUserNameChange = (e) => {
        const value = e.target.value;
        setSignupUserName(value);
        console.log(value)
    }

    const handleSignupEmailChange = (e) => {
        const value = e.target.value;
        setSignupEmail(value);
        console.log(value)
    }

    const handleSelectUserType = (e) => {
        setSignupUserType(e)
        console.log(e)
    }


    const handleSignupSubmit = (event) => {
        const data = {
            name: signupUserName,
            userId: signupUserId,
            email: signupEmail,
            userType: signupUserType,
            password: signupPassword,
        }
        console.log(data);
        onSubmit(data,event)
    }

    /** state for sign-up component */



    return (
        
            <div className="card card-signup m-5 p-5">
                <div className="row m-2">
                    <div className="container">
                        <h4 className='text-cemter'>SignUp</h4>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="input-group my-2">
                                <input type="text" className="form-control" placeholder="User Id" id="SignupUserId" value={signupUserId} onChange={handleSignupUserIdChange} />
                            </div>
                            <div className="input-group my-2">
                                <input type="password" className="form-control" placeholder="Password" id="signupPassword" value={signupPassword} onChange={handleSignupPasswordChange} />
                            </div>
                            <div className="input-group my-2">
                                <input type="text" className="form-control" placeholder="User Name" id="signupUserName" value={signupUserName} onChange={handleSignupUserNameChange} />
                            </div>
                            <div className="input-group my-2">
                                <input type="text" className="form-control" placeholder="Email" id="signupEmail" value={signupEmail} onChange={handleSignupEmailChange} />
                            </div>
                            <div className="row my-2">
                                <div className="col">
                                    <span className="mx-1 my-1"> User Type</span>
                                </div>
                                <div className="col">
                                    <DropdownButton
                                        align="end"
                                        title={signupUserType}
                                        id="userType"
                                        onSelect={handleSelectUserType}
                                        variant="light"
                                    >
                                        <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                        <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                            <div className="input-group my-2">
                                <input type="submit" className="form-control btn btn-primary" value="Signup" />
                            </div>
                            <div className="text-center my-2">
                                <span>"Already have an Account? <a href="#" onClick={() => {setShowSignupForm(false)}}> Login! </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
    )
}


export default Signup;