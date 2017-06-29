const fetch = require('node-fetch');

const yelp = {};
const Token = process.env.access_token;


yelp.search = (lat, long, term) => {
  console.log('search string- term, lat, long', term, lat, long);
  return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&radius=403&latitude=${lat}&longitude=${long}&radius_filter=403&limit=50`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${Token}`

    }
  })

};


module.exports = yelp;
