'use strict';
// See http://billpatrianakos.me/blog/2015/11/30/how-to-structure-bookshelf-dot-js-models/

// Selects the correct DB config object for the current environment
const knex            = require('knex')(require('../knexfile')[process.env.NODE_ENV]);
const bookshelf       = require('bookshelf')(knex);
const bookshelfSchema = require('bookshelf-schema')();

bookshelf.plugin('registry'); // Resolve circular dependencies with relations
// bookshelf.plugin(bookshelfSchema);

module.exports = bookshelf;
