const dotenv = require('dotenv');
dotenv.config();

const config = {
  testEnvironment: "node",
  verbose: true, 
  testMatch: ["**/*.test.js", "**/*.spec.js"],
  testTimeout: 2000
};

module.exports = config;