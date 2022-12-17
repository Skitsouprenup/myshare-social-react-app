import {v4 as uuidv4} from 'uuid';

import { sanityclient } from '../../sanityclient';

export const savePin = (pinId, userId) => {

    return sanityclient.
            patch(pinId).
            setIfMissing({save: [] }).
            insert('after','save[-1]',[{
                _key: uuidv4(),
                userId: userId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userId
                }
            }]).commit();
};