import { sanityclient } from '../sanityclient';
import {v4 as uuidv4} from 'uuid';

export const queryCommentsByNumber = (pinId, min = 0, max = 10) => {
    const query = `*[_type == 'pin' && _id == '${pinId}']
                    {
                     comments[][${min}...${max}]
                               { _key, comment, postedBy -> { _id, username, image } }
                    }`;
    return sanityclient.fetch(query);
}

export const addComment = (pinId, comment, userId) => {
    return sanityclient.
           patch(pinId).
           setIfMissing({comments: []}).
           insert('after', 'comments[-1]', [{
                _key: uuidv4(),
                postedBy: {
                   _type: 'postedBy',
                   _ref: userId
               },
               comment
           }]).
           commit();
};

export const removeComment = (pinId, commentKey) => {
    return sanityclient.patch(pinId).unset([`comments[_key=="${commentKey}"]`]).commit();
};