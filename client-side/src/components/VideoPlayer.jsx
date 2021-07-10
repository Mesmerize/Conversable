import React, {useContext} from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const {
            name,
            callAccepted, 
            myVideo, 
            userVideo, 
            callEnded, 
            stream, 
            call
            } = useContext(SocketContext);

    return (
        <div className='videoplayer-container'>
            {/* Our Own Video */}
            {
                stream && (
                    <div className="video-wrapper">
                        <div className="video-container">
                            <video playsInline muted ref={myVideo} autoPlay className='video' />
                            <div className="username">
                                <p className='user'>{name || 'Name'}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* User's Video */}
            {
                callAccepted && !callEnded && (
                    <div className="video-wrapper2">
                    <div className="video-container">
                        <video playsInline muted ref={userVideo} autoPlay className='video' />
                        <div className="username">
                            <p className='user'>{call.name || 'Name'}</p>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default VideoPlayer
