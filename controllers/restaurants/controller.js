const Yelp = require('../../services/restaurant.js');

const controller = {};

controller.index = (req, res) => {
  console.log('getting data from the right place');
  // console.log('req.params.zip: ', req.params.zip)
  // console.log('req.params ', req.params)
  Yelp.search(req.params.lat, req.params.long, req.params.term)
  .then(r => r.json()
  .then((data) => {
    // console.log('******data.: ', data);
    res.send(data);
  }))
  .catch(err => console.log(err));
};


module.exports = controller;
