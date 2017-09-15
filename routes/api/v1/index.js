const express = require('express'),
  router = express.Router(),
  Volunteer = require('../../../models/volunteer'),
  _ = require('lodash');

const database_settings = require('../../../knexfile.js');

const  knex = require('knex')(database_settings[process.env.NODE_ENV]);

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

function getHours(data){
 _.map(data, 'hours') 
};

router.get('/totalhours', function(req, res, next){
  knex.raw(`WITH hours AS(
         SELECT jsonb_array_elements(log) as hours FROM volunteers
        )
      SELECT sum(abs((hours ->> 'hours')::float)) as total_hours FROM hours`)
    .then(function(resp) {
      res.send(resp.rows[0])
      })
});

router.get('/hours', function(req, res, next){
  knex.raw(`WITH hours AS(
         SELECT jsonb_array_elements(log) as hours FROM volunteers
        )
      SELECT abs((hours ->> 'hours')::float) as hours FROM hours`)
    .then(function(resp) {
      res.send(resp.rows)
      })
});

module.exports = router;
