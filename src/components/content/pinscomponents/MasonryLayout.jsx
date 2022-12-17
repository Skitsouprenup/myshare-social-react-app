import React from 'react';

import Masonry from 'react-masonry-css';

import Pin from './Pin';

const MasonryLayout = ({ pins, recommendation = false }) => {

  /*For one content, 500 is the max width and it will
    scale automatically below 500.

    For multiple content, all content width is divided
    by the specified breakpoint on the right side. Content
    width will scale automatically up and down the breakpoint

    If device width is greater than the maximum breakpoint,
    the default breakpoint will be used. Content width will
    scale automatically up and down the breakpoint
  */
  const breakpointColumnsObj = {
    default: 5,
    2400: 4,
    1800: 3,
    1200: 2,
    500: 1
  };

  return (
    <Masonry className='flex flex-grow' 
             columnClassName='my-masonry-grid_column'
             breakpointCols={breakpointColumnsObj}>
      {pins?.map((item) => {
        return <Pin key={item?._id} pin={item}
                    recommendation={recommendation}/>;
        })
      }
    </Masonry>
  );
};

export default MasonryLayout;