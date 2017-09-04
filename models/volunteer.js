const database = require('../database');

const Volunteer = database.Model.extend({
  tableName: 'volunteers',
  hasTimestamps: true
});

module.exports = database.model('Volunteer', Volunteer);
