const  { connect } = require('mongoose');
const { startDatabaseServer } = require('./database');

async function mongoConnect() {
  try {
    const mongoInstance = await startDatabaseServer();
    const uri = mongoInstance.getUri();

    console.log(`mongo connection string ${uri}`);
    connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  mongoConnect
}