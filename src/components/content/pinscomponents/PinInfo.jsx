import React, {useContext, useEffect, useState, memo, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import { queryPinById } from '../../../scripts/crud/pin/readpin';
import { urlFor } from '../../../scripts/sanityclient';
import { deletePinInPinInfo } from '../../../scripts/crud/pin/deletepin';

import { HomeContext } from '../../container/Home';

import PinDownloadBtn from './pincomponents/pindlbtn';
import DestinationBtn from './pincomponents/destbtn';
import LoadingAnim from './LoadingAnim';
import { SaveButtonSelection } from './pincomponents/savebutton';
import DisplaySavedUsers from './pincomponents/dispsavedusers';
import PosterLink from './pincomponents/posterlink';
import Comments from './Comments';
import Recommendations from '../Recommendations';

const PinAdditionalInfo = ({pininfo, changeDivMaxWidth}) => {
  const [divRefMaxWIdth, setDivRefMaxWidth] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    const divMaxWidthChange = () => {
      setDivRefMaxWidth(changeDivMaxWidth(divRef));
    };

    divMaxWidthChange();
    window.addEventListener('resize', divMaxWidthChange);

    return () => window.removeEventListener('resize', divMaxWidthChange);
  }, [pininfo]);

  useEffect(() => {
    if(divRef !== null && divRef !== undefined)
      if(divRef.current !== null && divRef.current !== undefined)
        divRef.current.style.maxWidth = divRefMaxWIdth;
  },[divRefMaxWIdth]);

  return(
  <div ref={divRef} className='flex flex-col w-full'>
    <div>
      <span className='font-medium text-lg'>Description:&nbsp;</span>
      <span className='text-lg'>{pininfo?.about}</span>
    </div>
    <div className='flex'>
      <h3 className='font-medium text-lg'>Category:&nbsp;</h3>
      <p className='text-lg'>{pininfo?.category}</p>
    </div>
    {pininfo?.save && pininfo?.save?.length > 0 && (
      <div className='flex'>
      <h3 className='font-medium text-lg'>Saves:&nbsp;</h3>
      <p className='text-lg'>
        <DisplaySavedUsers savedUsers={pininfo?.save} numOnly={true}/>
        </p>
      </div>
    )}
  </div>);
};

const DisplayPinImg = memo(({pininfo, imgRef }) => {

  return <img ref={imgRef} src={urlFor(pininfo?.image).url()} alt='pin image'
              style={{maxWidth: '100%', minWidth: '200px'}}/>;
});

const PinInfo = () => {
  const [savePost, setSavePost] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pininfo, setPinInfo] = useState(null);
  const homeContext = useContext(HomeContext);
  const pinUserId = useParams();

  const navigate = useNavigate();
  const imgRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    queryPinById(
      pinUserId.pinId, 
      ['about', '_id', 'category', 'title', 'image { asset -> { url } }',  
       'save[] { _key, postedBy -> { _id, username, image } }',
       'postedBy -> { _id, username, image }',
       'destination', 'comments']).
    then((pin) => {
      if(!isCancelled) {
        setPinInfo(pin[0]);
        setLoading(false);
      }
    }).
    catch((e) => {
      setLoading(false);
      console.error(e);
    });

    return () => isCancelled = true;
  }, [pinUserId]);

  const changeDivMaxWidth = (divRef) => {
    /*
      if imgRef or divRef is null, components using this
      function like PinAdditionalInfo, Comments and
      Recommendations won't be resized properly.

      To avoid imgRef from getting a null value, make
      sure that the image is rendered first before accessing
      imgRef
     */
    if((imgRef !== null && imgRef !== undefined) &&
       (divRef !== null && divRef !== undefined)) {
        if((imgRef.current !== null && imgRef.current !== undefined) &&
          (divRef.current !== null && divRef.current !== undefined)) {
            return imgRef.current.width + 'px';
       }
    }
    return '';
  };

  return (
    <div className='flex flex-col items-center justify-center p-1'>
      {loading ? 
      (<div className='flex justify-center items-center'>
        <LoadingAnim message='Loading...'/>
       </div>) : 
      (<div className='flex flex-col items-center border border-gray-300
                     bg-gray-100 p-1 rounded-sm'>

        <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-semibold'>{pininfo?.title}</h2>
        
            {/*Poster */}
            <PosterLink postedBy={pininfo?.postedBy}/>
        </div>

          {/*Image */}
          <div className='flex items-center w-fit flex-col'>

            <div className='relative w-fit'
                 onMouseEnter={ () => setHoverState(true) }
                 onMouseLeave={ () => setHoverState(false) }>
              <DisplayPinImg pininfo={pininfo} imgRef={imgRef}/>

              {hoverState && (
              <div className='absolute top-0 flex flex-col justify-center 
              items-center p-2 gap-2 w-full h-full'>
                {!savePost && 
                  <SaveButtonSelection 
                      user={homeContext?.user} 
                      pinId={pininfo?._id}
                      setSavePost={setSavePost}
                      savedUsers={pininfo?.save}/>}

                <PinDownloadBtn image={pininfo?.image}/>

                {pininfo?.destination && (
                    <DestinationBtn destination={pininfo.destination}/>
                )}

                {pininfo && pininfo.postedBy?._id === homeContext?.user?._id && (
                  <div className='absolute top-0 w-full flex justify-end mt-1 mr-1'>
                    <div className='w-fit cursor-pointer'
                         onClick={(e) => {
                            const text = 'Are you sure you want to delete this pin?';
                            if(confirm(text) === true) {
                                setLoading(true);
                                deletePinInPinInfo(pininfo._id, navigate, setLoading);
                            }
                        }}>
                        <div className={`bg-red-400 opacity-75 rounded-md
                                        hover:opacity-100 hover:shadow-md 
                                        border border-gray-200`}>
                            {<RiDeleteBin2Fill className='text-2xl'/>}
                        </div>
                    </div>
                  </div>
                )}
              </div>
              )}
            </div>

            {/*Information(Bottom) */}
            <PinAdditionalInfo pininfo={pininfo} 
                               changeDivMaxWidth={changeDivMaxWidth}/>

          </div>

          {/*Comments */}
          <Comments pinId={pininfo?._id} user={homeContext?.user}
                    changeDivMaxWidth={changeDivMaxWidth}/>
          
          {/*Recommendations */}
          <Recommendations pinId={pininfo?._id} pinCategory={pininfo?.category}
                           changeDivMaxWidth={changeDivMaxWidth}/>

      </div>)}
    </div>
  );
};

export default PinInfo;