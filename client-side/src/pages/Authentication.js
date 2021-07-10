import React from 'react';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {Link, useHistory} from 'react-router-dom';

// const responseGoogle = () => {
//     console.log('Failed');
// }

// const successLogin = () => {
//     // console.log('success');
// }


const Authentication = () => {
    let history = useHistory();
    // Redirects user after authentication to the ChatRoom
    const successLogin = () => {

        history.push('/ChatRoom');

    }

    //Redirects to 404 Page if something goes wrong with auth
    const failedLogin = () => {
        history.push('/404');
    }

    return (
            <div className='auth-wrapper'>
                <div className="auth-container">
                    <h1 className="auth-header">Choose Your Sign in Method</h1>
                    <div className="btn-container2">
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_AUTH_KEY}
                            buttonText="Sign in with Google"
                            onSuccess={successLogin}
                            onFailure={failedLogin}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button className="btn2 btn-primary2 animate shake" onClick={renderProps.onClick} disabled={renderProps.disabled}><FontAwesomeIcon size='lg' icon={faGoogle} /> Sign in with Google</button>
                            )}
                        />
                        <Link to='/ChatRoom' className='space'>
                            <button className="btn2 btn-primary2 animate shake">
                                <FontAwesomeIcon size='lg' icon={faQuestionCircle} /> Continue as Guest
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Authentication
