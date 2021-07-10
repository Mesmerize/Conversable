import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://conversable.herokuapp.com/');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream)=> {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => setMe(id)); 

        socket.on('calluser', ({ from, name: callerName, signal}) => {
            setCall({isReceivedCall: true, from, name: callerName, signal});
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    // Beginning of test

    const muteUnmute = () => {
        const enabled = stream.getAudioTracks()[0].enabled;
        if(enabled) {
            muteButton();
            stream.getAudioTracks()[0].enabled = false;
        } else {
            unmuteButton();
            stream.getAudioTracks()[0].enabled = true;
        }
    }

    const muteButton = () => {
        const html = 
        `<i class="fas fa-microphone-slash icon-color fa-2x"></i>`
        

        document.querySelector('.user-btn').innerHTML = html;
    }

    const unmuteButton = () => {
        const html = 
            `<i class="fas fa-microphone icon-color fa-2x"></i>`
        

        document.querySelector('.user-btn').innerHTML = html;
    }

    const videoStop = () => {
        const enabled = stream.getVideoTracks()[0].enabled;
        if(enabled) {
            videoHide();
            stream.getVideoTracks()[0].enabled = false;
        } else {
            videoShow();
            stream.getVideoTracks()[0].enabled = true;
        }
    }

    const videoHide = () => {
        const html = 
        `<i class="fas fa-video-slash icon-color fa-2x"></i>`
        

        document.querySelector('.video-btn').innerHTML = html;
    }

    const videoShow = () => {
        const html = 
            `<i class="fas fa-video icon-color fa-2x"></i>`
        

        document.querySelector('.video-btn').innerHTML = html;
    }

    // End of test

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        // Stop receiving feed from user
        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{call,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall,muteUnmute,videoStop}}>
            { children }
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };