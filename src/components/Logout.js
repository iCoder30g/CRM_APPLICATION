import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()

    const logoutFn = () => {
        localStorage.clear()
        navigate("/")
    }

  return (
    <button onClick={logoutFn}>Logout</button>
  )
}

export default Logout