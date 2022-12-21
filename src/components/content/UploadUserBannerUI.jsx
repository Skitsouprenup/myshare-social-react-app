import React, { useState, useEffect } from 'react'

import { RiDeleteBin2Fill } from 'react-icons/ri';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { supportedImageFormat } from '../../scripts/supportedimg';

import { deleteUserBanner } from '../../scripts/crud/user/userbanner';
import LoadingAnim from './pinscomponents/LoadingAnim';
import UploadUserBannerHover from './UploadUserBannerHover';

export const DisplayBanner = ({imgPreview, bannerHeight}) => {

    return <img src={imgPreview} alt='Banner'
                style={{minHeight: bannerHeight, maxHeight: bannerHeight,
                        width: '100%'}}/>;
};

const UploadUserBannerUI = ({ user, bannerHeight }) => {
    const[hoverState, setHoverState] = useState(false);
    const[imgPreview, setImgPreview] = useState(null);
    const[imageAsset, setImgAsset] = useState(null);

    const[wrongImgFormat, setWrongImgFormat] = useState(false);
    const[uploadingBanner, setUploadingBanner] = useState(false);

    const previewBanner = (e) => {
        const selectedFile = e.target.files[0];
        let formatSupported = false;
    
        for(let format of supportedImageFormat)
          if(selectedFile.type === format) {
            formatSupported = true;
            break;
          }
    
        if(formatSupported) {
          setImgPreview(URL.createObjectURL(selectedFile));
          setImgAsset(selectedFile);
        }
        else {
          setTimeout(() => setWrongImgFormat(false), 1000);
          setWrongImgFormat(true);
        }
    
      };

      useEffect(() => {
        return () => {
          if(imgPreview) 
            URL.revokeObjectURL(imgPreview);
        }
      }, [imgPreview]);

    if(uploadingBanner) {
       return <div style={{maxHeight: bannerHeight, minHeight: bannerHeight}}
                   className='flex h-full w-full items-center justify-center'>
                <LoadingAnim message='Loading...'/>
              </div>
    }

    return (
        <>
            {/*Display Existing Banner */}
            {(user?.banner && !imgPreview) ? 
            (<div className='flex justify-center'
                  style={{maxHeight: bannerHeight, minHeight: bannerHeight}}>
            {/*Banner Preview */}

                <div className='relative w-full h-full flex items-center justify-center'
                onMouseEnter={ () => setHoverState(true) }
                onMouseLeave={ () => setHoverState(false) }>

                <DisplayBanner imgPreview={user?.banner?.asset?.url}
                                bannerHeight={bannerHeight}/>

                {hoverState && (
                    <div className='absolute flex justify-center'>
                        <div className={`bg-red-400 opacity-75 rounded-md
                                        hover:opacity-100 hover:shadow-md mt-1 mr-1 
                                        border border-gray-200 cursor-pointer w-fit`}
                            onClick={() => {
                                if(confirm('Do you want to remove this banner?')) {
                                    setUploadingBanner(true);
                                    deleteUserBanner(user?._id, setUploadingBanner);
                                }
                            }}>
                        <RiDeleteBin2Fill className='text-3xl'/>
                        </div>
                    </div>
                )}

                </div>
            </div>) :
                (imgPreview ? 
                (
                    <div className='flex justify-center'
                        style={{maxHeight: bannerHeight, minHeight: bannerHeight}}>
                        {/*Banner Preview */}

                        <div className='relative w-full h-full flex items-center justify-center'
                        onMouseEnter={ () => setHoverState(true) }
                        onMouseLeave={ () => setHoverState(false) }>

                        <DisplayBanner imgPreview={imgPreview}
                                           bannerHeight={bannerHeight}/>

                        <UploadUserBannerHover hoverState={hoverState}
                                               imageAsset={imageAsset}
                                               setImgAsset={setImgAsset}
                                               imgPreview={imgPreview}
                                               setImgPreview={setImgPreview}
                                               userId={user?._id}
                                               setUploadingBanner={setUploadingBanner}/>

                        </div>
                    </div>
                ) : (
                <label className='cursor-pointer'
                        htmlFor='image-upload'>
                    {/*Without Existing Banner*/}
                    <div className='flex justify-center border border-dashed border-black p-1'
                         style={{maxHeight: bannerHeight, minHeight: bannerHeight}}>
                        <div className='flex flex-col items-center w-fit m-auto text-center p-5'>
                            {!wrongImgFormat ? 
                                (<><AiOutlineCloudUpload className='text-2xl'/>
                                    Click to Upload Banner<br />
                                    <span className='text-gray-500'>
                                        Preferred height:&nbsp; 
                                        <span className='font-semibold'>{bannerHeight}</span>
                                    </span>
                                 </>) : 
                                (<>Wrong Image Format!</>)}
                        </div>
                        {!wrongImgFormat && (
                            <input type='file'
                                   name='image-upload'
                                   id='image-upload'
                                   onChange={previewBanner}
                                   hidden/>
                        )}
                    </div>
                </label>
            ))}
        </>
    )
}

export default UploadUserBannerUI;