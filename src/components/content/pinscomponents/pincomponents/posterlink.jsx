import React from 'react';
import {Link} from 'react-router-dom';

const PosterLink = ({postedBy, setActiveCategory}) => {

  return (
    <Link to={`/home/profile/${postedBy?._id}`}
          onClick={() => {setActiveCategory('');}}
          className='flex flex-row gap-x-1 w-fit m-1'>
        <img
            className='rounded-md object-cover w-8 h-8' 
            src={postedBy?.image} alt='Owner'/>
        <p className='capitalize my-auto font-medium'>
            {postedBy?.username}
        </p>
    </Link>
  );
};

export default PosterLink;