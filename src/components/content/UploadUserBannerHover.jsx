import React from 'react';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { uploadUserBanner } from '../../scripts/crud/user/userbanner';

const UploadUserBannerHover = ({hoverState, imageAsset, setImgAsset,
    imgPreview, setImgPreview, userId, setUploadingBanner}) => {

    const uploadBannerBtnStyle = `p-1 bg-white opacity-75 rounded-md hover:opacity-100
    hover:shadow-md flex flex-row justify-center 
    border border-gray-200 w-36`;

  return (
    <>
        {hoverState && (
        <div className='absolute flex flex-col gap-y-2'>
            <div className='flex justify-center'>
                <div className={`bg-red-400 opacity-75 rounded-md
                                 hover:opacity-100 hover:shadow-md mt-1 mr-1 
                                 border border-gray-200 cursor-pointer w-fit`}
                    onClick={() => {
                    URL.revokeObjectURL(imgPreview);
                    setImgAsset(null);
                    setImgPreview(null);
                    }}>
                <RiDeleteBin2Fill className='text-3xl'/>
                </div>
            </div>

            <button type='button'
                    className={uploadBannerBtnStyle}
                    onClick={() => {
                        setUploadingBanner(true);
                        uploadUserBanner(imageAsset, userId,
                                         setUploadingBanner);
                    }}>
                Upload Banner
            </button>
        </div>
        )}
    </>
  );
};

export default UploadUserBannerHover;