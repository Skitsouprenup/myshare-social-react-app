import React, { useState, useEffect, useCallback } from 'react';

import { AiOutlineCloudUpload } from 'react-icons/ai';

import LoadingAnim from '../pinscomponents/LoadingAnim';
import { supportedImageFormat } from '../../../scripts/supportedimg';

import { RiDeleteBin2Fill } from 'react-icons/ri';

export const DisplayImage = ({imgPreview, imageLoaded}) => {
  return <img src={imgPreview} 
              alt='uploaded-image'
              onLoad={imageLoaded} />;
};

const PinMakerImgUp = ( {imgAsset, setImgAsset} ) => {
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [hoverState, setHoverState] = useState(false);
  const [wrongImgFormat, setWrongImgFormat] = useState(false);

  const imageLoaded = useCallback(() => { 
    if(loading) setLoading(false);
  },[imgPreview]);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    let formatSupported = false;

    for(let format of supportedImageFormat)
      if(selectedFile.type === format) {
        formatSupported = true;
        break;
      }

    if(formatSupported) {
      setLoading(true);
      setImgPreview(URL.createObjectURL(selectedFile));
      setImgAsset(selectedFile);
    }
    else{ 
      setTimeout(() => setWrongImgFormat(false), 1000);
      setWrongImgFormat(true);
    };

  };

  useEffect(() => {
    return () => {
      if(imgPreview) 
        URL.revokeObjectURL(imgPreview);
    }
  }, [imgPreview]);

  return (
    <div className='flex items-stretch flex-col w-full mb-2'>

            {loading && <LoadingAnim message='Loading...'/> }
            {imgAsset ? (
                <div className='flex items-center justify-center'>
                  <div className='flex items-center justify-center'
                       onMouseEnter={ () => setHoverState(true) }
                       onMouseLeave={ () => setHoverState(false) }>

                    <div className='relative'>
                      <DisplayImage imgPreview={imgPreview} 
                                    imageLoaded={imageLoaded}/>
                    </div>
                    {hoverState && (
                      <div className={`absolute bg-red-400 opacity-75 rounded-md
                                       hover:opacity-100 hover:shadow-md mt-1 mr-1 
                                       border border-gray-200 cursor-pointer`}
                           onClick={() => {
                            URL.revokeObjectURL(imgPreview);
                            setImgAsset(null);
                            setImgPreview(null);
                           }}>
                        <RiDeleteBin2Fill className='text-3xl'/>
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                <label className='flex-grow cursor-pointer'
                       htmlFor='image-upload'>
                  <div className='border-t border-b border-dashed border-black p-1'>
                    <div className='flex flex-col items-center w-fit m-auto text-center'>
                      {!wrongImgFormat ? 
                        (<><AiOutlineCloudUpload className='text-2xl'/>Click to Upload Image</>) : 
                        (<>Wrong Image Format!</>)}
                    </div>
                    {!wrongImgFormat && (
                      <input type='file'
                             name='image-upload'
                             id='image-upload'
                             onChange={uploadImage}
                             hidden/>
                    )}
                  </div>
                </label>
              )}
        </div>
  );
};

export default PinMakerImgUp;