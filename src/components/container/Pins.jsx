import React, {useState, createContext} from 'react';
import {Outlet} from 'react-router-dom';

import {NavBar} from '../content/pinscomponents/contentlist';

export const PinsContext = createContext();

const Pins = () => {
  const [searchItem, setSearchItem] = useState('');

  return (
    <div className='flex flex-grow flex-col'>

      {/*Navigation Bar */}
      <div className='bg-gray-50 mb-2 mt-1 mx-1'>
        <NavBar searchProps={{setSearchItem}} />
      </div>

      {/*Pins Content and others*/}
      <div className='flex flex-grow justify-center'>
        <PinsContext.Provider value={{searchItem}}>
          <Outlet />
        </PinsContext.Provider>
      </div>

    </div>
  );
};

export default Pins;