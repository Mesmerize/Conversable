import React, {useContext} from 'react';
import {SocketContext} from '../SocketContext';

const Notifications = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
    return (
        <>
            {
                call.isReceivedCall && !callAccepted && (
                    <div className='incoming-call'>
                        <h1>{call.name} is Calling: </h1>
                        <button className='answer-btn answer-btn-primary animate shake' type='button' onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default Notifications
 