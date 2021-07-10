import React from 'react';
import pepe from '../img/pepe.png';
import {useHistory} from 'react-router-dom';

const Error = () => {

    let history = useHistory();
    const backToHome = () => {
        history.push('/');
    }

    return (
        <div className='error-wrapper'>
            <div className="error-container">
                <h1 className='error-header'>404 ERROR</h1>
                <p className='error-paragraph'>Something Went Wrong :(</p>
                <div className="btn-container3">
                    <button onClick={backToHome} className="btn3 btn-primary3 animate shake">
                        Go Back To Homepage
                    </button>
                </div>
            </div>
            <img className='img-pepe' src={pepe} alt="" />
        </div>
    )
}

export default Error
