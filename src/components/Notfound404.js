import React from 'react'
import { useNavigate } from "react-router-dom"
import not from '../assets/404.svg'

const Notfound404 = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
            <div>
                <h1>Page Not Found</h1>
                <img src={not} alt="Page Not Found" />
                <br />
                <p>Page is not available.</p>
                <div>
                    <button className="btn btn-primary" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </section>

    )
}

export default Notfound404;