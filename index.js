const http       = require('http');
const dbm        = require('./dbmanager');
const encryption = require('./encryption')
const db         = require("./database")

let otps = [
]

function createOTP(hash, data, callback) {

  otp = [
    hash,
    data,
    callback
  ]

  otps.forEach((element, index) => {
    if(element == undefined) {
      otps[index] = otp;
      return index;
    }
  })
  otps.push(otp)
  return otps.length-1
}

const requestListener = async(req, res) => {


  url = req.url.split("/").slice(1)
  
  if(url[0] == "otp" && url.length == 3) {
    index = parseInt(url[1])

    if(otps[index][0] == url[2]) {
      otps[index][2](otps[index][1])
      otps[index] = undefined
      res.end("Complete OTP Action")
    } else {
      res.end("Failed to verify OTP")
    }
    res.end("Failed to verify OTP")
  }

  else if(url[0] == "newUser" && url.length >= 3) {
    
    if(await db.get(url[1]) != undefined) { // Cancel if user exists
      res.end("user exists")
    } else {
      publicKey = encryption.convertUrlEscapeCharacters(url.slice(2).join("/"))
      publicKey = publicKey.replace(/-----NEWLINE-----/g, "\n")

      dbm.createAccount(url[1], publicKey)

      res.end("Created User")
    }
  }

  else if(url[0] == 'newBlock' && url.length == 3) {

    hash = encryption.createHash()
    user = await dbm.getUser(url[1])
    user = user["publicKey"]
    encrypted = encryption.encrypt(user, hash)

    pin = createOTP(hash, [user, url[2]], (data) => {
      publicKey = data[0]
      info = data[1]
      dbm.addBlock({
        publicKey,
        info
      })
      res.end("Created Block")
    })

    res.end(JSON.stringify([pin, encrypted]))
  }


  else if(url[0] == "del" && url.length == 2) {
    hash = encryption.createHash()
    admin = await dbm.getUser("admin")
    publicKey = admin["publicKey"]
    encryptedHash = encryption.encrypt(publicKey, hash)

    if(await db.get(url[1]) == undefined) {
      res.end("Invalid Key")
    }
    
    otpid = createOTP(hash, url[1], async(data) => {
      if(data == "blockchain") {
        await db.set("blockchain", "[]")
      } else {
        await db.delete(data)
      }
    })

    res.end(JSON.stringify([otpid, encryptedHash]))
    
  }


  else if(url[0] == "ls") {
    if(url.length == 1) {url.push("")}
    let keys = await db.list(url[1])
    let response = {}
    
    for(let element of keys) {
      value = await db.get(element)
      response[element] = value
    }
    res.end(JSON.stringify(response))
  }


  else {
    res.end("{ 'Status': 404 }")
  }
}

const server = http.createServer(requestListener);
server.listen(8080);

