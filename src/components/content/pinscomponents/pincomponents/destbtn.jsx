import React from 'react'

import defaultpinbtnstyle from './defaultpinbtnstyle';
import { truncateText } from '../../../../scripts/utilities';

import {RiArrowUpCircleFill} from 'react-icons/ri';

const DestinationBtn = ({destination, btnStyle = undefined}) => {
  return (
    <div>
        <a href={destination}
        target='blank'
        rel='noreferrer'
        onClick={(e) => {e.stopPropagation();}}>
        <div className={btnStyle ? btnStyle : defaultpinbtnstyle}>
            <RiArrowUpCircleFill className='text-xl'/>
            {truncateText(10, new URL(destination).hostname)}
        </div>
        </a>
    </div>
  );
};

export default DestinationBtn;