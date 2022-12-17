import React, {useEffect} from 'react';

import BackgroundVideo from '../../assets/share.mp4';
import LoginButton from '../content/LoginButton';

import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user'))
      navigate('/home/pins', {replace: 'true'});
  },[]);

  return (
    <>
      <video 
        src={BackgroundVideo} 
        type='video/mp4'
        controls={false}
        loop muted autoPlay
        className='fixed h-screen w-screen object-cover z-10'>
        Video can't be played!
      </video>
      <div 
      className='fixed top-0 bottom-0 left-0 right-0 
               bg-black bg-opacity-60 h-screen w-screen
                 z-20'></div>
      <LoginButton />
    </>
  );
};

export default Login;