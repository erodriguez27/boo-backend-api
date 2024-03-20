const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

const startDatabaseServer = async () => {
  if (mongod) return mongod;

  mongod = await MongoMemoryServer.create({
    instance: {
      port: Number(process.env.MONGOPORT) || 27017,
    },
  });

  return mongod;
};

const stopDatabaseServer = async () => {
  await mongod.stop();
};

module.exports = {
  startDatabaseServer,
  stopDatabaseServer,
};
