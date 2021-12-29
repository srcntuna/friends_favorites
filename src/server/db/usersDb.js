const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sercan@34",
  database: "friends_fav",
});

module.exports = {
  query: (q, params, callback) => {
    return connection.query(q, params, callback);
  },
};
