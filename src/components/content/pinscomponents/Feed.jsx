import React, { useState, useEffect, createContext, memo, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import LoadingAnim from './LoadingAnim';
import { searchPins, searchPinsByCategory } from '../../../scripts/crud/searchitem';
import { PinsContext } from '../../container/Pins';

export const FeedContext = createContext();

const DisplayPins = memo(({pins}) => {
  return <>{<MasonryLayout pins={pins} />}</>;
});

const Feed = ({categoryLink = false}) => {
  const[reloadFeed, setReloadFeed] = useState(false);
  const[loading, setLoading] = useState(true);
  const[pins, setPins] = useState(null);
  const category = useParams().categoryType;

  const searchState = useContext(PinsContext);

  useEffect(() => {
    const isCancelled = Object.seal({cancel: false});
    queryPins(isCancelled);

    return () => isCancelled.cancel = true;
  },[category, searchState.searchItem]);

  useEffect(() => {
    const isCancelled = Object.seal({cancel: false});
    if(reloadFeed) {
      queryPins(isCancelled);
      setReloadFeed(false);
    }

    return () => isCancelled.cancel = true;
  },[reloadFeed]);

  const queryPins = async (isCancelled) => {
    setLoading(true);
    if(!categoryLink) {
      await searchPins(searchState.searchItem).
            then((data) => { 
              if(!isCancelled.cancel)
                setPins(data);
             });
    }
    else {
      await searchPinsByCategory(category).
            then((data) => { 
              if(!isCancelled.cancel)
                setPins(data);
            });
    }
    setLoading(false);
  };

  if(loading) 
    return (
    <div className='flex justify-center items-center w-full h-full bg-gray-200'>
      <LoadingAnim message='Loading Pins...' />
    </div>);

  return (
    <div className='flex w-full bg-gray-200 border-black'>
      <FeedContext.Provider value={{setReloadFeed}}>
        {pins.length > 0 ? 
         (<DisplayPins pins={pins}/>) : 
         (<div className='flex items-center justify-center w-full'>
            <h1 className='font-bold text-gray-500 w-fit h-fit text-4xl'>
              No pins...
            </h1>
          </div>)}
      </FeedContext.Provider>
    </div>
  );
};

export default Feed;