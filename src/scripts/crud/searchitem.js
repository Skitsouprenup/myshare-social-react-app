import { sanityclient } from '../sanityclient';
import { queryAllPinsDescSort } from '../utilqueries';

export const searchPins = (searchItem) => {
    const query = 
    `*[_type == 'pin' && title match '${searchItem}*' || 
      category match '${searchItem}']
      { image { asset -> { url } },
        _id,
        destination,
        postedBy -> { _id, username, image },
        save[] { _key, postedBy -> { _id, username, image } },
        title
      }`;
    
      if(searchItem && (searchItem !== 'all')) return sanityclient.fetch(query);
      else return sanityclient.fetch(queryAllPinsDescSort);
};

export const searchPinSavedUsersById = (pinId) => {
  const query = `*[_type == 'pin' && _id == '${pinId}']
                 { save[] { _key, postedBy -> { _id } } }`;
  return sanityclient.fetch(query);
};

export const searchSimilarPinsByCategory = (pinId, category, projections) => {
  const query = `*[_type == 'pin' && _id != '${pinId}' && category == '${category}']
                {${projections}}`;
  return sanityclient.fetch(query);
};

//match operator is case-insensitive
export const searchPinsByCategory = (category) => {
  const query = `*[_type == 'pin' && category match '${category}']
                  { image { asset -> { url } },
                    _id,
                    destination,
                    postedBy -> { _id, username, image },
                    save[] { _key, postedBy -> { _id, username, image } },
                    title
                  }`;
  
  if(category !== 'all') {
    return sanityclient.fetch(query);
  }
  else return sanityclient.fetch(queryAllPinsDescSort);
};

