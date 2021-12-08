const exec = require("child_process").exec;

var value = "default"


module.exports.run = function(command, callback) {
  exec("python pairedkeys.py \""+command+"\"", function(error, stdout, stderr){ 
    output = stdout.substring(-1, stdout.length-1)
    callback(output); 
  });
}

module.exports.createHash = function() {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( var i = 0; i < 32; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//Create a block
/* 
Client - 
Requests to make block
  sends: publickey, name, block information

Server - 
Creates a hash
  uses: publickey
Sends hash to client

Client - 
Decrypts hash
Sends server hash

Server - 
Validates hash
  true:
    adds hash and encrypted hash
    adds original data sent by client to blockchain
*/

//Validate a block
/*
Client -
Requests validation
  sends: block
\n
\n
Server - 
Compares stored encrypted hash and a newly encrypted hash
  false:
    removes blockchain
*/