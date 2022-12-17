import React from 'react'

import {RiFileDownloadLine} from 'react-icons/ri';
import defaultpinbtnstyle from './defaultpinbtnstyle';

const pinDownloadBtn = ({image, btnStyle = undefined}) => {

  return (
    <div>
        <a  href={`${image?.asset?.url}?dl=`}
            onClick={(e) => {e.stopPropagation();}}
            download>
            <div className={btnStyle ? btnStyle : defaultpinbtnstyle}>
                <RiFileDownloadLine className='text-xl'/>Download
            </div>
        </a>
    </div>
  );
};

export default pinDownloadBtn;