const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');


module.exports.createKeys = function() {
  return nacl.box.keyPair();
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



module.exports.createSetBytes = function() {
  return [
    107,  67, 163, 166, 150, 120,
    226, 102, 122, 188, 135,  81,
    146,  21, 214,  22,  94,  43,
    227, 140, 239, 141, 125, 102
  ]
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