const { defaults } = require('lodash');
const dotenv = require('dotenv');

const defaultsEnvs = `
PORT=4000
DB_CLIENT=postgresql
DATABASE_URL=postgres://127.0.0.1:5432/harvey-volunteers
NODE_ENV=development
`;

function setupEnvironment(){
  const defaultConfig = dotenv.parse(new Buffer(defaultsEnvs));
  dotenv.config();
  defaults(process.env, defaultConfig);
  return true;
}

exports.setup = setupEnvironment;
