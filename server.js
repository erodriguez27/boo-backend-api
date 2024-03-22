const {server} = require("./app");

const port =  process.env.PORT || 3000;

// strat server
server.listen(port)
console.log('Express started. Listening on %s', port);