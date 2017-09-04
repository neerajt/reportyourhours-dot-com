const express = require('express'),
  router = express.Router(),
  Volunteer = require('../../../models/volunteer'),
  _ = require('lodash');


function setRoute(route, handler){
  return router.post(route, function(req, res, next){
    return handler(req.body)
      .then(function(body){
        res.send(body);
        next();
      })
      .catch(function(error){
        // TODO global error handling middleware.
        next(error);
      });
  });
}

setRoute('/volunteers', function(requestBody){
  var data = _.clone(requestBody);
  data.log = JSON.stringify(requestBody.log);

  return new Volunteer(data)
    .save();
});

module.exports = router;
