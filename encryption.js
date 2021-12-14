let crypto = require("crypto"),
 keypair = require("keypair");


module.exports.createKeys = () => {
  pair = keypair(3072);
  return pair
}

module.exports.encrypt = (publicKey, message) => {
  let toEncrypt = Buffer.from(message, "utf8");
  let encrypted = crypto
    .publicEncrypt(publicKey, toEncrypt)
    .toString("base64");
  return encrypted
}

module.exports.decrypt = (privateKey, message) => {
  let toDecrypt = Buffer.from(message, "base64");
  let decrypted = crypto
    .privateDecrypt(privateKey, toDecrypt)
    .toString("utf8");
  return decrypted
}

module.exports.convertUrlEscapeCharacters = (string) => {
  charmap = 
  [[" ","%20"],
  ["$", "%24"],
  ["&", "%26"],
  ["`", "%60"],
  [":", "%3A"],
  ["<", "%3C"],
  [">", "%3E"],
  ["[", "%5B"],
  ["]", "%5D"],
  ["{", "%7B"],
  ["}", "%7D"],
  ["“", "%22"],
  ["+", "%2B"],
  ["#", "%23"],
  ["%", "%25"],
  ["@", "%40"],
  ["/", "%2F"],
  [";", "%3B"],
  ["=", "%3D"],
  ["?", "%3F"],
  ["\\","%5C"],
  ["^", "%5E"],
  ["|", "%7C"],
  ["~", "%7E"],
  ["‘", "%27"],
  [",", "%2C"]]

  charmap.forEach((element) => {
    while(string != string.replace(element[1], element[0])) {
      string = string.replace(element[1], element[0])
    }
  })
  return string
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

module.exports.validateKeys = function(publicKey, privateKey) {
  hash = module.exports.createHash()
  encrypted = module.exports.encrypt(publicKey, hash)
  decrypted = module.exports.decrypt(privateKey, encrypted)
  return hash == decrypted
} 