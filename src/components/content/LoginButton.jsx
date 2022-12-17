import React from 'react'

import mainLogo from '../../assets/logo.png';
import jwt_decode from 'jwt-decode';
import {GoogleLogin} from '@react-oauth/google';

import {createUserData} from '../../scripts/crud/user/createuserdata'

import {useNavigate} from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const getCredential = (credentialResponse) => {
    const decodedJWT = jwt_decode(credentialResponse.credential);
    const data = createUserData(decodedJWT);

    if(data) data.then(()=> {
      //console.log("loginbutton: " + decodedJWT.sub);
      localStorage.removeItem('user');
      localStorage.setItem('user', decodedJWT.sub);
      navigate('/home/pins', {replace: 'true'});
    });

  };

  return (
    <div className='absolute flex justify-center items-center flex-col 
                      h-screen w-screen z-30'>
        <div className='w-36 p-2'>
          <img src={mainLogo} alt='main logo'></img>
        </div>
        <div className='p-2' aria-label='google-login-button'>
          <GoogleLogin
            onSuccess={getCredential}
            locale='en_US'
            onError={() => {
              console.error('Login Failed');
            }}
          />
        </div>
      </div>
  );
};

export default LoginButton;