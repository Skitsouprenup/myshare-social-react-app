import React, { memo } from 'react'
import Comment from './Comment';

import {v4 as uuidv4} from 'uuid';

const ShowComments = ({comments, setComments, user, setOffset, pinId}) => {

  return(
      <ul className='flex flex-col gap-y-2'>
        {comments.map((poster) => {
          return <Comment key={uuidv4()} commentPoster={poster} user={user}
                          setComments={setComments} 
                          commentLength={comments?.length}
                          setOffset={setOffset}
                          pinId={pinId}/>})
        }
      </ul>
    );
};

export default memo(ShowComments);