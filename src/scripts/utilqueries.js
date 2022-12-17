
export const queryAllPinsDescSort = 
`*[_type == 'pin'] 
{ image { asset -> { url } },
  _id,
  destination,
  postedBy -> { _id, username, image },
  save[] { _key, postedBy -> { _id, username} },
  title
} | order(_createdAt desc)`;