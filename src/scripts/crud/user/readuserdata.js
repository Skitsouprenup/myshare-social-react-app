import { sanityclient } from '../../sanityclient';

export const getUserNameById = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}'][0]{
        _id,
        username,
        image,
        banner { asset->{url} }
    }`;

    return sanityclient.fetch(query);
};