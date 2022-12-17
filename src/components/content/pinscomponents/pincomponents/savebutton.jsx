import React from 'react';
import {RiSave3Line} from 'react-icons/ri';

import { savePin } from '../../../../scripts/crud/pin/updatepin';

import defaultpinbtnstyle from './defaultpinbtnstyle';

export const SaveButtonSelection =  
({ user, pinId, setSavePost, savedUsers }) => {

  const savedBtnStyle = `p-1 bg-green-400 opacity-75 rounded-md hover:opacity-100
                         hover:shadow-md flex flex-row justify-center
                         border border-gray-200 w-36 cursor-default`;
  
  const SaveButton = () => {
  
    const processSavingPin = () => {
      setSavePost(true);
      savePin(pinId, user._id).then(() => {
        setSavePost(false);
      }).catch((e) => {
        setSavePost(false);
        console.error(e);
      });
    };
  
    const saveEvent = (e) => {
      e.stopPropagation();
      processSavingPin();
    };
  
    return (
      <div>
        <div onClick={(e) => {saveEvent(e);}}>
          <div className={defaultpinbtnstyle}>
            <RiSave3Line className='text-xl'/>Save
          </div>
        </div>
      </div>
    );
  };

  const SavedButton = () => {
  
    return (
      <div>
        <div onClick={(e) => {e.stopPropagation();}}>
          <div className={savedBtnStyle}>
            <RiSave3Line className='text-xl'/>Saved
          </div>
        </div>
      </div>
    );
  };

  //verifying and fetching user may take time. Thus, if user
  //is not yet ready, return null and wait for the next render
  //when the user is loaded. Additionally, fetching pins may
  //take time thus saved users data may be delayed.
  const credentialsLoaded = (user === null || user === undefined || 
                             savedUsers === undefined);
  if(credentialsLoaded) return null;

  //If it's empty, it means that no one saved the
  //specified pin.
  const isSavedUsersEmpty = (savedUsers === null);
  if(isSavedUsersEmpty) return <SaveButton />;
  
  //check if the logged-in user saved the specified pin.
  let pinSavedByUser = false;
  for(let savedUser of savedUsers) {
      if(savedUser.postedBy._id === user._id) {
          pinSavedByUser = true;
          break;
      }
  }
  
  return(
  pinSavedByUser ? 
  <SavedButton /> : 
  <SaveButton /> );
};
