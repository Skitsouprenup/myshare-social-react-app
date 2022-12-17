import { NavLink } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

const SingleCategory = ({categoryName, categoryRoute, setActiveCategory, 
                         activeCategory, closeSideBar, liStyle}) => {
    const hoverStyle = 'bg-gray-300';

    const[hoverState, setHoverState] = useState(false);

    useEffect(() => {
        const windowPathName = window.location.pathname;
        const pathName = '/home/pins'+categoryRoute;

        if(windowPathName === pathName)
            setActiveCategory(pathName);

    },[activeCategory]);

    const setActiveLinkClass = (isActive) => {
        const linkNotActive = 'flex p-1 text-gray-400 hover:text-black '+
                              'transition-all';
        const linkActive = 'flex p-1 font-extrabold transition-all';

        return isActive ? linkActive : linkNotActive;
    };

    return (
        <li className={hoverState ? 
                       (liStyle ? (liStyle) : (hoverStyle)) : 
                       (liStyle)}
            onMouseEnter={() => {setHoverState(true);}}
            onMouseLeave={() => {setHoverState(false);}}>
            <NavLink 
            to={'/home/pins' + categoryRoute}
            className={({isActive}) => {
            return setActiveLinkClass(isActive);
            }}
            style={{width: 'fit-content'}}
            onClick={() => {
                setActiveCategory('/home/pins'+categoryRoute);
                closeSideBar();
            }}>
                <h2 className='mx-2'>{categoryName}</h2>
            </NavLink>
        </li>
    );
};

export default SingleCategory;