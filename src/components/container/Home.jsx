import React, { useState, useRef, useEffect, createContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import mainLogo from '../../assets/logo.png';
import { HiMenu } from 'react-icons/hi';

import SideBar from '../content/SideBar';
import { getUserNameById } from '../../scripts/crud/user/readuserdata';

export const HomeContext = createContext();

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  async function getUsername () {
    await getUserNameById(localStorage.getItem('user')).
    then((data) => {
      setUser(data);
    });
  }
  useEffect(() => { 
    getUsername();
    scrollRef.current.scrollTo(0,0);
  }, []);

  return (
  <div className='flex bg-gray-50 h-screen md:h-auto md:flex-row flex-col w-full'>

    {/*Sidebar for large screens */}
    <div className='hidden md:flex md:h-screen sticky top-0'>
      <SideBar user={user} 
               activeCategory={activeCategory}
               setActiveCategory={setActiveCategory}/>
    </div>

    {/*Button links for mobile */}
    <div className='flex md:hidden flex-row'>
      <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
        <HiMenu className='text-2xl cursor-pointer'
                onClick={() => {setSideBarToggle(true);}}/>
        <Link to='/'>
          <img src={mainLogo} alt='main logo' className='w-14'/>
        </Link>
        <Link to='/home/profile'
              onClick={() => {setActiveCategory('');}}>
          <img src={user?.image} alt='user' className='w-10'/>
        </Link>
      </div>
    </div>

    {/*Sidebar for mobile */}
    {sideBarToggle && (
      <div className='fixed w-4/5 bg-white h-screen shadow-md 
                      z-10 animate-slide-in md:hidden'>
        <SideBar user={user}
                 sideBarToggle={sideBarToggle}
                 setSideBarToggle={setSideBarToggle}
                 activeCategory={activeCategory}
                 setActiveCategory={setActiveCategory} />
      </div>)}

    {/*main content */}
    <div className='flex flex-grow border-l border-gray-400' 
         ref={scrollRef}>
     <HomeContext.Provider value={{user, setActiveCategory}}>
      <Outlet />
     </HomeContext.Provider>
    </div>
  </div> 
  );
};

export default Home;