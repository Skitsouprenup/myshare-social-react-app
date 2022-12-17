import React, { useState } from 'react';

import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';

import mainLogo from '../../assets/logo.png';
import { RiCloseCircleFill } from 'react-icons/ri';
import { RiLogoutBoxLine } from 'react-icons/ri';

import SingleCategory from './SingleCategory';

import { truncateText } from '../../scripts/utilities';
import { topicCategories } from '../../scripts/categories';

const SideBar = ({user, sideBarToggle, setSideBarToggle,
                  activeCategory, setActiveCategory}) => {
  const[hoverLogout, setHoverLogout] = useState();
  const[hoverProfLink, setHoverProfLink] = useState();

  const logout = () => {
    localStorage.clear();
  };

  const closeSideBar = () => {
    if(sideBarToggle)
      setSideBarToggle(!sideBarToggle);
  };

  const checkActiveCategory = (categoryRoute) => {
    const pathName = '/home/pins'+categoryRoute;

    if(activeCategory === pathName)
      return 'border-r-2 border-black bg-gray-300';
    else return '';
  };

  return (
    <div className='flex flex-col min-w-fit h-full'>

        {/*Home Link */}
        <div className='relative flex items-center my-1 flex-col'>
          
          <NavLink 
          to='/'
          className='relative flex flex-col z-10'
          onClick={closeSideBar}>
            <img src={mainLogo} alt='main logo' className='w-20'/>
            <div className='flex w-fit'>
              <RiHomeFill className='my-auto mx-1'/>Home
            </div>
          </NavLink>

          {/*Close Button */}
          {sideBarToggle && (
            <div className='absolute w-full flex justify-end items-center p-2'>
              <RiCloseCircleFill className='text-xl cursor-pointer'
                                 onClick={() => {setSideBarToggle(false);}}/>
            </div>)}

        </div>
        <hr className='border-t-gray-400'/>
      
      <div className='flex flex-col'>
        
        {/*Profile Link */}
        {user && (
          <div className='flex flex-col mx-1 px-1 py-3 w-40'>
            
            <div className='w-fit mt-1'
                 onMouseEnter={() => {setHoverProfLink(true);}}
                 onMouseLeave={() => {setHoverProfLink(false);}}>
              <Link className='flex gap-x-1 items-center'
              to={`/home/profile/${user?._id}`}
              onClick={() => {
                closeSideBar();
                setActiveCategory('');
              }}>
                <img src={user.image} className='w-8 rounded-lg' alt='profile picture'/>
                <h3 className={hoverProfLink ? 
                               'font-medium' :
                               'font-normal'}>
                  {truncateText(15, user?.username)}
                </h3>
              </Link>
            </div>

            <div className='w-fit mt-1'
                 onMouseEnter={() => {setHoverLogout(true);}}
                 onMouseLeave={() => {setHoverLogout(false);}}>
              <Link className='flex gap-x-1 items-center'
              to={`/`}
              onClick={() => {
                if(confirm('Do you wanna logout?'))
                  logout();
              }} >
                <RiLogoutBoxLine className='my-auto mx-1 text-2xl'/>
                  <h3 className={hoverLogout ? 
                                 'font-medium' :
                                 'font-normal'}>Logout</h3>
              </Link>
            </div>

          </div>
        )}

        {/*Category Links */}
        <h2 className='mx-1 px-1 font-medium'>Categories</h2>
        <ul className='w-full'>
          {topicCategories.map(
            (category) => {
              return <SingleCategory key={category.name}
                                     categoryName={category.name}
                                     categoryRoute={category.route}
                                     closeSideBar={closeSideBar}
                                     liStyle={checkActiveCategory(category.route)}
                                     setActiveCategory={setActiveCategory}
                                     activeCategory={activeCategory}/>;
            }
          )}
        </ul>
      </div>

    </div>
  );
};

export default SideBar;