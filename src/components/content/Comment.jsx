import React, { useState } from 'react';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { queryCommentsByNumber, removeComment } from '../../scripts/crud/comments';
import { COMMENT_INC } from './pinscomponents/Comments';
import LoadingAnim from './pinscomponents/LoadingAnim';

const Comment = ({commentPoster, setComments, user,
                  commentLength, setOffset, pinId}) => {

const[deletingComment, setDeletingComment] = useState(false);

    const deleteComment = () => {
        const text = 'Do you want to delete this comment?';

        if(confirm(text)) {

          setDeletingComment(true);
          removeComment(pinId, commentPoster?._key).
          then(() => {
            queryCommentsByNumber(pinId, 0, commentLength).
            then((data) => {
              
              setComments(data[0]?.comments);
              if(data[0]?.comments?.length <= 0)
                setOffset(COMMENT_INC);
              else setOffset(data[0]?.comments?.length);
              setDeletingComment(false);
              alert('Comment deleted!');
            });
          });
           
        }
    };

    return(
      <li className='flex justify-start items-start'>
          {deletingComment ? (<LoadingAnim message='Deleting...'/>) : (
            <>
              <img className='rounded-md object-cover w-8 h-8' 
                   src={commentPoster?.postedBy?.image} alt='Poster'/>
              <div className='ml-1'>

                <div className='flex gap-x-1 justify-start items-start'>
                  <h3 className='font-medium'>
                    {commentPoster?.postedBy?.username}
                  </h3>
                  {commentPoster?.postedBy?._id === user?._id && (
                    <div className='flex flex-col justify-center'>
                      {<RiDeleteBin2Fill className='text-2xl bg-red-400 opacity-75 rounded-md
                                    hover:opacity-100 hover:shadow-md 
                                    border border-gray-200
                                    cursor-pointer'
                                        onClick={deleteComment}/>}
                    </div>
                  )}
                </div>

                <p>{commentPoster?.comment}</p>
              </div>
            </>
          )}
        </li>);
};

export default Comment;