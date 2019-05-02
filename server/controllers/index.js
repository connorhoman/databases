var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
        //get message request from client 
        
        //model
        res.write(models.messages.get());
        res.statusc(200);
        res.end();
        //get me messages from db

        //response with message from db



    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //take data from request

      console.log(req.body);
      //respond 200 if succes and 400 if no sucess
      //write file 
      res.status(200);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('inside user get');
      res.write(models.users.get());
      res.status(200);
      res.end();
    }
    ,
    post: function (req, res) {
      console.log('inside user post');
      console.log(req.body);
      //parse the body and only send the username
      console.log(req.body.username);
      var name = models.users.post(req.body.username);
      res.write(req.body.username);
      res.status(200);
      res.end();
    }
  }
};

/*
 request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
*/