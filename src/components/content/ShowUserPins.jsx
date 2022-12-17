import React, { useState, useEffect, memo } from 'react';
import { queryUserSavedPins, queryUserCreatedPins, queryArrayLength} from '../../scripts/crud/user/userpins';

import LoadingAnim from './pinscomponents/LoadingAnim';
import MasonryLayout from './pinscomponents/MasonryLayout';

const ShowUserPins = ({toggleState, toggleCriteria, userId}) => {
  const[loading, setLoading] = useState(false);
  const[pins, setPins] = useState(null);

  useEffect(() => {
    //queryArrayLength().then((data) => {console.log(data);});
    let isCancelled = {cancel: false};
    queryPins(isCancelled);

    return () => isCancelled.cancel = true;
  },[toggleState]);

  const queryPins = async (isCancelled) => {
    setLoading(true);
    if(toggleState === toggleCriteria.TOGGLE_SAVED) {
      await queryUserSavedPins(userId).
            then((data) => { 
              if(!isCancelled.cancel) setPins(data); 
            });
    }
    else if(toggleState === toggleCriteria.TOGGLE_CREATED) {
      await queryUserCreatedPins(userId).
            then((data) => { 
              if(!isCancelled.cancel) setPins(data); 
            });
    }
    setLoading(false);
  }

  return (
    <div className='mt-1 flex items-center justify-center'>
      {loading ? 
       (<LoadingAnim message='Loading Pins...'/>) : 
       (pins ? 
        <MasonryLayout pins={pins}/> :
        <h1 className='font-bold text-gray-500 w-fit h-fit text-4xl'>
          No pins...
        </h1> )}
    </div>
  );
};

export default memo(ShowUserPins);