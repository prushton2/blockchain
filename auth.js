const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');


module.exports.createKeys = function() {
  return nacl.box.keyPair();
}

module.exports.parseKeysAsArray = function(keyPair) {
  keys = {
    "publicKey": [

    ],
    "secretKey": [

    ],
  }

  keyPair = JSON.parse(keyPair)

  for(let key in keyPair["publicKey"]) {
    keys["publicKey"].push(keyPair["publicKey"][key])
  }
  for(let key in keyPair["secretKey"]) {
    keys["secretKey"].push(keyPair["secretKey"][key])
  }

  return keys

}