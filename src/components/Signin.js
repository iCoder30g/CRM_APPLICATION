import React, { useState } from 'react'
import "../styles/login.css"


const Signin = (props) => {
    const { onSubmit ,setShowSignupForm} = props 

    /**state for Signin component*/
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")



    const handleChangeUserId = (e) => {
        const value = e.target.value;
        setUserId(value);
        console.log(value)
    }

    const handleChangeUserPassword = (e) => {
        const value = e.target.value;
        setUserPassword(value)
        console.log(value)
    }

    const handleLoginSubmit = (event) => {
        const data = {
            userId: userId,
            password: userPassword,
        }
        console.log(data)
        onSubmit(data,event)
    }

    /**state for Signin component*/



    return (
        
            <div className='card card-signin m-5 p-5'>
                <div className='row m-2'>
                    <div className='container'>
                        <h4 className='text-center'>Login</h4>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="input-group my-2">
                                <input type="text" className="form-control" placeholder="User Id" id="userId" value={userId} onChange={handleChangeUserId} />
                            </div>
                            <div className="input-group my-2">
                                <input type="password" className="form-control" placeholder="Password" id="password" value={userPassword} onChange={handleChangeUserPassword} />
                            </div>
                            <div className="input-group my-2">
                                <input type="submit" className="form-control btn btn-primary" value="LogIn" />
                            </div>
                            <div className="text-center">
                                <span>"Don't have an Account? <a href="#" onClick={()=> {setShowSignupForm(true)}}> Signup! </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
    )
}

export default Signin;