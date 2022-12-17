import React from 'react';
import { countFormatter } from '../../../../scripts/utilities';

const DisplaySavedUsers = ({ savedUsers, numOnly = false }) => {

    if(savedUsers !== null && savedUsers !== undefined) {

        if(savedUsers.length > 0) {
            let result = '';

            if(savedUsers.length > 1)
                result = countFormatter(savedUsers.length) + ' Saves';
            else if(savedUsers.length === 1)
                result = countFormatter(savedUsers.length) + ' Save';

            if(!numOnly) {
                return (
                    <div>
                        <p>{result}</p>
                    </div>);
            }
            else return <>{savedUsers.length}</>
        }
    }

    return null;
  };

export default DisplaySavedUsers;