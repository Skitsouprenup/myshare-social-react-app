import { sanityclient } from '../../sanityclient';

export const createUserData = (decodedjwt) => {

    if(!decodedjwt) {
        console.error("Invalid Google JWT!");
        return undefined;
    }

    const userdata = {
        _id: decodedjwt.sub,
        _type: 'user',
        username: decodedjwt.name,
        image: decodedjwt.picture,
    };
    return sanityclient.createIfNotExists(userdata);
};