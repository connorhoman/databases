var db = require('../db');
var mysql = require('mysql');

module.exports = {
  
  messages: {
    get: function () { 
      dbConnection = mysql.createConnection({
        user: 'student',
        password: 'student',
        database: 'chat'
      });
      dbConnection.connect();
      dbConnection.query('SELECT * FROM messages', function(err, result, fields) {
        if (err) { throw err; } else {
          console.log('inside of message.get', JSON.stringify(result));
          //return array of message objects
          return JSON.stringify(result);
        }
      });
      
    }, // a function which produces all the messages
    post: function (username, messageContent, roomname) {
      dbConnection = mysql.createConnection({
        user: 'student',
        password: 'student',
        database: 'chat'
      });
      dbConnection.connect();
      var queryString = 'INSERT INTO messages (username, message, roomname) VALUES (?, ?, ?) ';
      var queryArgs = [username, messageContent, roomname];

      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      dbConnection = mysql.createConnection({
        user: 'student',
        password: 'student',
        database: 'chat'
      });
      dbConnection.connect();
      db.dbConnection.connect();

      //console.log(dbConnection.query('SELECT * FROM users'));
      return db.dbConnection.query('SELECT * FROM users');

    },
    

    post: function (username) {
      
      dbConnection = mysql.createConnection({
        user: 'student',
        password: 'student',
        database: 'chat'
      });
      dbConnection.connect();

      var queryString = 'INSERT INTO users (username) VALUES (?) ';
      var queryArgs = [username];
       
   

      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) { throw err; } else {
          return 'Sucessfully added' + username;
        }
      });
    }
  }
};


