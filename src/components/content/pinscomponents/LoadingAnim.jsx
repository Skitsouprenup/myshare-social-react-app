import React from 'react';
import { Blocks } from 'react-loader-spinner';

const LoadingAnim = ({ message }) => {
  return (
    <div className='flex flex-col justify-start items-center'>
      <Blocks
        visible={true}
        height='80'
        width='80'
        ariaLabel='blocks-loading'
      />
      <p className='text-center text-lg'>{ message }</p>
    </div>
  );
};

export default LoadingAnim;