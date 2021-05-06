// require your server and launch it
const server = require('./api/server');

require('dotenv').config()

const PORT = process.env.PORT 

server.listen(PORT, () => {
  console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});
