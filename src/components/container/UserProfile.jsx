import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowUserPins from '../content/ShowUserPins';
import UploadUserBannerUI from '../content/UploadUserBannerUI';

import { getUserNameById } from '../../scripts/crud/user/readuserdata';

const UserProfile = () => {
  const toggleCriteria = 
  Object.freeze({TOGGLE_SAVED: 'TOGGLE_SAVED',
                 TOGGLE_CREATED: 'TOGGLE_CREATED'});
  const[user, setUser] = useState(null);
  const userId = useParams();

  const btnStyle = `shadow-sm rounded-xl p-2 bg-white border border-gray-300
                    w-24 hover:shadow-md hover:shadow-blue-300
                    transition-shadow duration-150`;
  const btnStyleToggled = `shadow-sm rounded-xl p-2 bg-green-500 border border-gray-300
                           w-24 hover:shadow-md hover:shadow-blue-300
                           transition-shadow duration-150`;
  const bannerHeight = '300px';

  const[createdBtnStyle, setCreatedBtnStyle] = useState(btnStyleToggled);
  const[savedBtnStyle, setSavedBtnStyle] = useState(btnStyle);
  const[btnToggleState, setBtnToggleState] = useState(toggleCriteria.TOGGLE_CREATED);

  useEffect(() => {
    getUserNameById(userId.profileId).
    then((data) => {
      setUser(data);
    }).
    catch((e) => {
      console.error(e);
    });
  },[userId?.profileId]);

  const toggleButtonStyle = (toggleState) => {

    if(toggleState !== btnToggleState) {
      if(toggleState === toggleCriteria.TOGGLE_SAVED) {
        setCreatedBtnStyle(btnStyle);
        setSavedBtnStyle(btnStyleToggled);
      }
  
      if(toggleState === toggleCriteria.TOGGLE_CREATED) {
        setCreatedBtnStyle(btnStyleToggled);
        setSavedBtnStyle(btnStyle);
      }
      setBtnToggleState(toggleState);
    }

  };

  return (
    <div className='w-full bg-gray-200'>

      {/*This div overlaps the div with dashed border */}
      <div className='relative w-full'
           style={{minHeight: '350px', maxHeight: '350px'}}>

        {/*Banner */}
        <div className='w-full'>
          <UploadUserBannerUI user={user}
                              bannerHeight={bannerHeight}/>
        </div>
        
        {/*

           4px is the additional padding(top) by the child div
           that holds the image.

           subtracting 4px from 150px retains the perfect
           y-centering of the profile picture.
        */}
        <div className='absolute'
            style={{maxHeight: '100px', minHeight: '100px', 
                    top: 'calc(250px - 4px)', left: '50%', transform: 'translateX(-50%)'}}>
          <div className='rounded-full p-1 bg-white'>
            <img  className='rounded-full'
                  src={user?.image} 
                  alt='user'/>
          </div>
        </div>

      </div>
      
      <h2 className='w-full text-center mt-1 text-xl font-semibold capitalize'>
        {user?.username}
      </h2>

      <div className='flex flex-col items-center mt-2'>
        <h2 className='w-full text-center mb-2 text-xl font-medium'>Pins</h2>
        <div>
          <button className={'mr-1 ' + createdBtnStyle}
                  onClick={() => {toggleButtonStyle(toggleCriteria.TOGGLE_CREATED)}}>
            Created
          </button>
          <button className={'ml-1 ' + savedBtnStyle}
                  onClick={() => {toggleButtonStyle(toggleCriteria.TOGGLE_SAVED)}}>
            Saved
          </button>
        </div>
      </div>

      <ShowUserPins toggleState={btnToggleState} 
                    toggleCriteria={toggleCriteria}
                    userId={userId.profileId}/>

    </div>
  );
};

export default UserProfile;