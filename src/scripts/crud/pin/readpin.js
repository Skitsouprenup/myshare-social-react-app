import { sanityclient } from '../../sanityclient';

export const queryPinById = (pinId, projections = undefined) => {
    let query = undefined;

    if(!projections) {
        query = `*[_type == "pin" && _id == '${pinId}']`;
    }
    else {
        let projList = '{';
        for(let x of projections) {
            const composite = x + ',';
            projList += composite;
        }
        projList += '}';

        query = `*[_type == "pin" && _id == '${pinId}']` + projList;
    }

    return sanityclient.fetch(query);
};

export const queryPinsByCategory = (category) => {
    const query = `*[_type == "pin" && category == "${category}"]`;
    return sanityclient.fetch(query);
};