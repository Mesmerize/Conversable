import React, {useState, useContext} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboard,  
  faPhoneAlt, 
  faPhoneSlash ,
  faVideo,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons';

const Options = ({children}) => {
    const {
        me, 
        callAccepted,
         name, 
         setName, 
         callEnded, 
         leaveCall, 
         callUser,
         muteUnmute,
         videoStop
        } = useContext(SocketContext);
        const [idToCall, setIdToCall] = useState('');

    return (
      <div>
        {
        callAccepted && !callEnded ? (
          <div className="user-features">
              <button onClick={muteUnmute} className="user-btn">
                <FontAwesomeIcon className='icon-color' size='2x' icon={faMicrophone} />
              </button>
              <button className='mute-btn user-btn'>
                <FontAwesomeIcon onClick={leaveCall} className='icon-color' size='3x' icon={faPhoneSlash} />
              </button>
              <button onClick={videoStop} className="video-btn user-btn">
                <FontAwesomeIcon className='icon-color' size='2x' icon={faVideo} />
              </button>
          </div>
        ) : (
          <div className="options-container">
            <form className="form-wrapper" noValidate autoComplete='off'>
              <div className="features-container">
                <p className="account-info">Account Info</p>
                <input placeholder='Enter Username' label='Name' value={name} onChange={(e) => setName(e.target.value)} className='input' maxLength='10'/>
                <CopyToClipboard text={me} className='margin-button feature-btn feature-primary animate shake'>
                  <button type="button">
                  <span><FontAwesomeIcon size='1x' icon={faClipboard} /> Copy Your ID</span>
                  </button>
                </CopyToClipboard>
              </div>
              <div className="features-container">
                <p className="account-info">Join a Room</p>
                <input placeholder='Enter Room ID' label='Enter ID To Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} className='input' />
                  <button onClick={() => callUser(idToCall)} className='margin-button feature-btn feature-primary animate shake' type="button">
                  <span><FontAwesomeIcon size='1x' icon={faPhoneAlt} /> Call</span>
                  </button>
              </div>
            </form>
            { children }
          </div>
        ) 
      }
        </div>
    )
}

export default Options
