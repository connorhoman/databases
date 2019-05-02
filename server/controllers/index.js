var models = require('../models');
var mysql = require('mysql');
module.exports = {
  messages: {
    get: function (req, res) {
      //get message request from client 
        
      //model

      var messagePromise = function() { 
        return new Promise ((resolve, reject) => {
          dbConnection = mysql.createConnection({
            user: 'student',
            password: 'student',
            database: 'chat'
          });
          dbConnection.connect();
    
          dbConnection.query('SELECT * FROM messages', function(err, result, fields) {
            if (err) { reject('Error fetching messages'); } else {
              console.log('inside of message.get', JSON.stringify(result));
              //return array of message objects
              resolve(JSON.stringify(result));
            } 
          });
        });
      };
      messagePromise().then((results) => {
        console.log('then result', results);
        res.write( results);
        res.status(200);
        res.end();
        
    
  
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //take data from request
      var messagePromise = function() { 
        return new Promise ((resolve, reject) => {
          dbConnection = mysql.createConnection({
            user: 'student',
            password: 'student',
            database: 'chat'
          });
          dbConnection.connect();
    
          var queryString = 'INSERT INTO messages (username, message, roomname) VALUES (?, ?, ?) ';
          var queryArgs = [req.body.username, req.body.message, req.body.roomname];
          
          dbConnection.query(queryString, queryArgs, function (err) {
            if (err) { reject('Error posting messages'); } else {
              resolve(200);
            }
          });

        });
      };

      messagePromise().then((statusCode) => {
        res.status(statusCode);
        res.end();
      });
      //respond 200 if succes and 400 if no sucess
  
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('inside user get');
      res.write(models.users.get());
      res.status(200);
      res.end();
    },
    post: function (req, res) {
      console.log('inside user post');
      console.log(req.body);
      //parse the body and only send the username
      console.log(req.body.username);
      models.users.post(req.body.username);
      res.write(req.body.username);
      res.status(200);
      res.end();
    }
  }
};

