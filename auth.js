const crypto = require('crypto');

module.exports.createKeys = function() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048
  })
}

module.exports.parseKeysAsArray = function(keyPair) {
  keys = {
  }

  keyPair = JSON.parse(keyPair)

  if(keyPair["publicKey"] != undefined) {

    keys["publicKey"] = []

    for(let key in keyPair["publicKey"]) {
      keys["publicKey"].push(keyPair["publicKey"][key])
    }
  }

  if(keyPair["secretKey"] != undefined) {

    keys["secretKey"] = []

    for(let key in keyPair["secretKey"]) {
      keys["secretKey"].push(keyPair["secretKey"][key])
    }
  }
  return keys
}

module.exports.encrypt = function(message, key, otp) {

}

module.exports.createHash = function() {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{};,.<>/?';
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

Server - 
Compares stored encrypted hash and a newly encrypted hash
  false:
    removes blockchain
*/