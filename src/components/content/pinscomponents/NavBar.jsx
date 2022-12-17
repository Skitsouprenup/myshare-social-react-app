import React, { useState, useEffect, useContext } from 'react';

import { RiAddLine, RiSearchEyeLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { trimSpaces } from '../../../scripts/utilities';

import { HomeContext } from '../../container/Home';

const NavBar = ({ searchProps: {setSearchItem} }) => {
  const[searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const homeContext = useContext(HomeContext);

  //only query search every 500 millis.
  //This will improve performance and
  //reduce requests to database to
  //a maximum of 2 requests per second
  //
  //For some reason, time outs are not
  //being cleared. isCancelled variable
  //is our fallback cancellation
  useEffect(() => {
    let isCancelled = false;
    const searchToFeed = () => {
      if(!isCancelled)
        setSearchItem(searchVal.trim());
    };
    if(trimSpaces(searchVal)) {
      setTimeout(searchToFeed, 500);
    }

    return () => {
      isCancelled = true;
      clearTimeout(searchToFeed);
    }
  },[searchVal]);

  return (
    <div className='flex gap-x-1 items-center'>
      
      {/*Search Bar */}
      <div className='flex justify-start flex-grow focus-within:shadow
                    bg-yellow-400 border border-gray-200 border-opacity-75'>
        <RiSearchEyeLine className='text-2xl ml-1 my-auto'/>
        {/*
          Note: use width: 100% instead of flex-grow if you want a
          textfield that resizes based on its parent element even
          the parent element has a flex display.
         */}
        <input
         type='text'
         onChange={(e) => {setSearchVal(e.target.value)}}
         value={searchVal}
         onFocus={() => {
          navigate('/home/pins');
          homeContext?.setActiveCategory('');
         }}
         className='outline-none h-6 m-1 w-full'
        />
      </div>

      {/*New Pin Link */}
      <Link to='/home/pins/newpin'
            className='flex items-center border-2 border-black h-8 w-14
                       hover:bg-yellow-400'
            onClick={() => {homeContext?.setActiveCategory('');}}>
        <div className='flex w-fit'>
          <RiAddLine className='text-2xl'/><h2 className='font-medium'>Pin</h2>
        </div>
      </Link>

    </div>
  );
};

export default NavBar;