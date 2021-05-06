// require your server and launch it
const server = require('./api/server');

require('dotenv').config()

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
