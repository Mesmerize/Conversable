import React from 'react';
import '../chatroom.css';
import bg from '../img/Fuchsia.jpg';
import VideoPlayer from '../components/VideoPlayer';
import Notifications from '../components/Notifications';
import Options from '../components/Options';
import {Link} from 'react-router-dom';


const ChatRoom = () => {

    return (
      <div className='wrapper'>
        <img className='blur bg' src={bg} alt="bg" />
          <div className="content-wrapper">
            <div className="navbar-container">
              <p className='company-name'>
                <span>Conversable</span>
                <span className='bluey'> Beta</span>
              </p>
              <div className="logout-container">
                <Link to ='/'>
                  <button className="logout logout-primary animate shake">
                          <span>Logout</span>
                  </button>
                </Link>
              </div>
            </div>
              <VideoPlayer />
              <Options>
                  <Notifications />
              </Options>
          </div>
      </div>
  )
}

export default ChatRoom
