import { sanityclient } from '../../sanityclient';

export const queryUserCreatedPins = (userId) => {
    const query = `*[_type == 'pin' && userId == '${userId}']
                    { image { asset -> { url } },
                      _id,
                      destination,
                      postedBy -> { _id, username, image },
                      save[] { _key, postedBy -> { _id, username} },
                      title
                    }`;

    return sanityclient.fetch(query);
};

export const queryUserSavedPins = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId]
                    { image { asset -> { url } },
                      _id,
                      destination,
                      postedBy -> { _id, username, image },
                      save[] { _key, postedBy -> { _id, username} },
                      title
                    }`;

    return sanityclient.fetch(query);
};

export const queryArrayLength = () => {
    const query = `count(*[_type == 'pin'])`;

    return sanityclient.fetch(query);
};