import React, { useState, useEffect, memo, useRef } from 'react'
import { searchSimilarPinsByCategory } from '../../scripts/crud/searchitem';

import MasonryLayout from './pinscomponents/MasonryLayout';
import LoadingAnim from './pinscomponents/LoadingAnim';

const ShowRecommendations = memo(({pins}) => {

  return(
  <div className='flex flex-col w-full'>
    <h2 className='font-medium text-lg'>Similar Pins</h2>
    <div className='flex flex-grow'>
        {pins && <MasonryLayout pins={pins} recommendation={true}/>}
    </div>
  </div>);
});

const Recommendations = ({pinId, pinCategory, changeDivMaxWidth}) => {
  const[pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  const divRef = useRef(null);

  useEffect(() => {
    const divMaxWidthChange = () => {
      changeDivMaxWidth(divRef);
    };

    divMaxWidthChange();
    window.addEventListener('resize', divMaxWidthChange);

    return () => window.removeEventListener('resize', divMaxWidthChange);
  }, [pinId]);

  useEffect(() => {queryPins();},[pinId]);

  const queryPins = async () => {
    setLoading(true);
    await searchSimilarPinsByCategory(pinId, pinCategory, 
                              `image { asset -> { url } }, _id`).
          then((data) => { setPins(data); });
    setLoading(false);
  }

  return (
    <div ref={divRef}>
      {loading ? <LoadingAnim message='Loading Pins...' /> : (
        pins?.length > 0 && <ShowRecommendations pins={pins}/>
      )}
    </div>
  );
};

export default Recommendations;