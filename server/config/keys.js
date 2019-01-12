require('dotenv').config();

module.exports = {
   secrets: {
     jwt: process.env.PrivateKey,
     jwtExp: "100d"
   },
   dbUrl: "mongodb://localhost:27017/trello-clone"
 };
 