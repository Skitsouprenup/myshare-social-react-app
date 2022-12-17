import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {RiDeleteBin2Fill} from 'react-icons/ri';

import { urlFor } from '../../../scripts/sanityclient';
import { deletePin } from '../../../scripts/crud/pin/deletepin';

import { HomeContext } from '../../container/Home';
import { SaveButtonSelection } from './pincomponents/savebutton';

import PinDownloadBtn from './pincomponents/pindlbtn';
import DestinationBtn from './pincomponents/destbtn';
import PosterLink from './pincomponents/posterlink';
import DisplaySavedUsers from './pincomponents/dispsavedusers';

import { FeedContext } from './Feed';
import LoadingAnim from './LoadingAnim';

const Pin = ({ pin : { destination, _id, image, postedBy, title, save }, recommendation }) => {
  const [deletingPin, setDeletingPin] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [savePost, setSavePost] = useState(false);

  const homeContext = useContext(HomeContext);
  const feedContext = useContext(FeedContext);
  const navigate = useNavigate();
  
  if(deletingPin)
    return(
    <div className='w-full m-auto'>
        <LoadingAnim message='Deleting Pin...'/>
    </div>);

  return (
    <div className='p-1 m-1 shadow-sm hover:shadow-md border border-gray-300
                    bg-gray-50 transition-shadow duration-150'>
        
        <div className='relative rounded-sm border border-gray-300
                        flex justify-center overflow-hidden cursor-zoom-in' 
                onMouseEnter={ () => setHoverState(true) }
                onMouseLeave={ () => setHoverState(false) }
                onClick={ () => {
                    homeContext?.setActiveCategory('');
                    navigate(`/home/pins/pininfo/${_id}`);
                }}>

            {/*Content(image) */}
            <img alt={`${title}`} src={urlFor(image).url()} />

            {/*Buttons */}
            {!recommendation && hoverState && (
                <div className='absolute top-0 flex flex-col justify-center 
                                items-center p-2 gap-2 w-full h-full'>
                    
                    {/*Save Button */}
                    {!savePost && 
                        <SaveButtonSelection 
                            user={homeContext?.user} 
                            pinId={_id}
                            setSavePost={setSavePost}
                            savedUsers={save}/>}

                    {/*Download Button */}
                    <PinDownloadBtn image={image}/>
                    
                    {/*Destination Link*/}
                    {destination && (
                        <DestinationBtn destination={destination}/>
                    )}

                    {/*Delete Link*/}
                    {postedBy?._id === homeContext?.user?._id && (
                        <div className='absolute top-0 w-full flex justify-end mt-1 mr-1'>
                            <div className='w-fit cursor-pointer'
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    const text = 'Are you sure you want to delete this pin?';
                                    if(confirm(text) === true) {
                                        setDeletingPin(true);
                                        deletePin(_id, 
                                                  feedContext.setReloadFeed, 
                                                  setDeletingPin);
                                    }
                                }}>
                                    
                                <div className={`bg-red-400 opacity-75 rounded-md
                                                hover:opacity-100 hover:shadow-md 
                                                border border-gray-200`}>
                                    <RiDeleteBin2Fill className='text-2xl'/>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            )}

        </div>
        
        {/*Poster */}
        {!recommendation && 
         <PosterLink postedBy={postedBy}
                     setActiveCategory={homeContext.setActiveCategory}/>}

        {/*# of users that save the specified pin */}
        {!recommendation && <DisplaySavedUsers savedUsers={save}/>}

    </div>

  );
};

export default Pin;