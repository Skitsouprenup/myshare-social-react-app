import React, {useState, useEffect, useRef } from 'react';

import { queryCommentsByNumber, addComment } from '../../../scripts/crud/comments';
import { trimSpaces } from '../../../scripts/utilities';
import ShowComments from '../ShowComments';
import LoadingAnim from './LoadingAnim';

export const COMMENT_INC = 3;
const Comments = ({pinId, user, changeDivMaxWidth}) => {
  const [divRefMaxWIdth, setDivRefMaxWidth] = useState('');
  const [loadComments, setLoadComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(COMMENT_INC);

  const divRef = useRef(null);

  useEffect(() => {
    const divMaxWidthChange = () => {
      setDivRefMaxWidth(changeDivMaxWidth(divRef));
    };

    divMaxWidthChange();
    window.addEventListener('resize', divMaxWidthChange);

    return () => window.removeEventListener('resize', divMaxWidthChange);
  }, [pinId]);

  useEffect(() => {
    let isCancelled = false;

    setLoadComments(true);
    queryCommentsByNumber(pinId, 0, offset).
    then((data) => {
      if(!isCancelled) {
        setComments(data[0].comments);
        setLoadComments(false);
      }
    });

    return () => isCancelled = true;
  }, []);

  useEffect(() => {
    if(divRef !== null && divRef !== undefined)
      if(divRef.current !== null && divRef.current !== undefined)
        divRef.current.style.maxWidth = divRefMaxWIdth;
  },[divRefMaxWIdth]);

  const showMoreComments = () => {
    setLoadComments(true);
    queryCommentsByNumber(pinId, offset, offset+COMMENT_INC).
    then((data) => {
      if(data[0].comments.length > 0) {
        let tempArray = [...comments, ...data[0].comments];
        setComments(tempArray);
      }
      setOffset(offset+COMMENT_INC);
      setLoadComments(false);
    });
  };

  const submitComment = async () => {
    const commentNoSpc = trimSpaces(comment);

    if(commentNoSpc) {
      setSubmittingComment(true);
      await addComment(pinId, comment, user?._id);
      alert('comment added!');
      setComment('');
      setSubmittingComment(false);
    }
    else {
      if(commentNoSpc === '')
        alert('comment box is empty');
    }

  };

  return (
    <div ref={divRef} className='flex flex-col mt-3 w-full'>
      
      <label htmlFor='comment'>
        <h2 className='font-medium text-lg'>Comments</h2>
      </label>
      {comments?.length > 0 ? (
        <div className='mx-2 my-1'>
          <ShowComments comments={comments} user={user}
                        setComments={setComments}
                        setOffset={setOffset}
                        pinId={pinId}/>
          
          {comments.length >= offset && (loadComments ? (
            <LoadingAnim message='Loading Comments...'/>
          ) : (
            <button className='cursor-pointer text-blue-600 hover:underline'
                    onClick={showMoreComments}
                    type='button'>Show more
            </button>
          ))}
        </div>
      ) : (<h2 className='font-light text-lg italic ml-2'>No comments...</h2>)}

      {submittingComment ? (<LoadingAnim message='Submitting Comment...'/>) : (
        <div className='flex m-2'>

          <img className='rounded-md object-cover w-8 h-8' 
              src={user?.image} alt='User'/>
          <div className='flex flex-grow flex-col items-end ml-1'>
            <textarea className='w-full h-full p-1 border border-gray-300
                                 outline-none focus:shadow-md focus:shadow-blue-300'
                      name='comment'
                      value={comment}
                      onChange={(e) => {setComment(e.target.value);}}
                      placeholder='Add Comment...'
                      style={{resize: 'none', height: '90px'}} />
            <button type='button' 
                    className='w-fit p-1 rounded-lg border border-gray-300 
                               bg-white hover:bg-blue-300 mt-2 mr-2 shadow-sm'
                    onClick={submitComment}>
              Post Comment
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Comments;