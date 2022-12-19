import React, { useState, useEffect } from 'react';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import { newUserSignin, newUserSignup } from '../api/auth';
import { USER_ROLES } from "../constants/userRoles";
import { useNavigate } from 'react-router-dom';

import "../styles/login.css"




const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false)
  const navigate = useNavigate();


  /**
   * if the user already logged in, nevigate user to the respective page 
   * according to the userTypes
   */
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("userTypes") === "CUSTOMER")
        navigate('/customer');
      else if ((localStorage.getItem("userTypes") === "ENGINEER"))
        navigate('/engineer');
      else
        navigate('/admin');
    }
  });


  const redirectToHomePage = (userTypes) => {
    if (userTypes === USER_ROLES.CUSTOMER) {
      navigate("/customer");
    } else if (userTypes === USER_ROLES.ENGINEER) {
      navigate("/engineer");
    } else {
      navigate("/admin");
    }
  }


  const handleLoginSubmit = (data, event) => {
    console.log(data)
    // make api call --> loginUser(data)
    newUserSignin(data)
      .then(res => {
        if (res.status === 200) {
          /**
           * 1- store the user information in the browser, using localstorage
           * 2- redirect the user according to the usertypes
           * 3- handle error/fail cases (message)
           */
          const {
            accessToken,
            email,
            name,
            userId,
            userStatus,
            message,
            userTypes } = res.data;

          if (message) {
            alert(message);
          } else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userStatus", userStatus);
            localStorage.setItem("userTypes", userTypes);

            redirectToHomePage(userTypes);
            console.log(res)
          }

        }
      })
      .catch(function (error) {
        setError(true)
        setMessage(error.response.data.message);
      })

    event.preventDefault();
  };


  const handleSignupSubmit = (data, event) => {
    console.log(data)
    // make api call signupUser(data) 
    newUserSignup(data)
      .then(res => {
        if (res.status === 201) {
          setShowSignupForm(false)
          setMessage("User Signed Up Successfully...")
        }
      }).catch(function (error) {
        if (error.response.status === 400) {
          setError(true)
          setMessage(error.response.data.message);
        }
        else
          console.log(error);
      })

    event.preventDefault();
  }



  return (
    <div className='backGround d-flex justify-content-center align-items-center vh-100'>

      {!showSignupForm && (
        <Signin
          onSubmit={handleLoginSubmit}
          setShowSignupForm={setShowSignupForm}
        />)}


      {showSignupForm && (
        <Signup
          onSubmit={handleSignupSubmit}
          setShowSignupForm={setShowSignupForm}
        />)}
        
      
      <div className={error ? "text-danger text-center" : "text-success text-center"} >{message}</div>

    </div>
  )
}



export default Login;
