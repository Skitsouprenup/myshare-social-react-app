import React, { useContext, useState } from 'react';

import PinMakerForm from '../pinmakercomponents/PinMakerForm';

import { HomeContext } from '../../container/Home';
import PinMakerImgUp from '../pinmakercomponents/PinMakerImgUp';

const PinMaker = () => {
  const [submittingForm, setSubmittingForm] = useState(false);
  const [imgAsset, setImgAsset] = useState(null);

  const homeContext = useContext(HomeContext);

  const bgBorderNotLoading = 'border border-gray-400 bg-gray-200';
  return (
    <div className='flex flex-grow items-center justify-center
                    max-xs:items-stretch mb-1 w-48'>
      
      <div className={`flex flex-col items-center rounded-md max-xs:flex-grow
                      py-2 `+(submittingForm ? '' : bgBorderNotLoading)}>

        {!submittingForm && (
        <>
          <h2 className='font-semibold text-xl'>Create Pin</h2>
          <div className='flex flex-row items-center'>
            <img className='w-9 h-9 rounded-md mr-1 mt-3 mb-2'
                 src={homeContext?.user?.image}
                 alt='user'/>
            <span className='font-medium text-md'>{homeContext?.user?.username}</span>
          </div>
          
          {/*Image Upload */}
          <PinMakerImgUp imgAsset={imgAsset} setImgAsset={setImgAsset}/>
        </>
        )}

        {/*Form */}
        <PinMakerForm imgAsset={imgAsset} 
                      user={homeContext?.user}
                      setSubmittingForm={setSubmittingForm}/>
      </div>

    </div>
  );
};

export default PinMaker;