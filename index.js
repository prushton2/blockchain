const http       = require('http');
const dbm        = require('./dbmanager');
const pk         = require('./paired_keys')
const encryption = require('./encryption')

const Database = require("@replit/database")
const db = new Database()
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
  console.log(url)
  
  if(url[0] == "otp" && url.length == 3) {
    index = parseInt(url[1])
    
    console.log(otps[index][0])
    console.log(url[2])

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
    
    if(await db.get(url[1]).then((value) => {return value}) != undefined) { // Cancel if user exists
      res.end("user exists")
    } else {
      publicKey = encryption.convertUrlEscapeCharacters(url.slice(2).join("/"))
      publicKey = publicKey.replace(/-----NEWLINE-----/g, "\n")

      dbm.createAccount(url[1], publicKey)

      res.end("Created User")
    }
  }

  else if(url[0] == 'newBlock' && url.length == 3) {
    hash = pk.createHash()
    user = await dbm.getUser(url[1])
    user = user["publicKey"]
    encrypted = encryption.encrypt(user, hash)
    pin = createOTP(hash, [user, url[2]], (data) => {
      userName = data[0]
      info = data[1]
      dbm.addBlock({
        publicKey,
        info
      })
      res.end("Created Block")
    })
    res.end(JSON.stringify([pin, encrypted]))
  }
  else if(url[0] == "del" && url.length == 3) {
    //parse given privateKey
    privateKey = JSON.parse(url[2])


    if(await pk.validateUser("admin", privateKey)) {
      await db.delete(url[1]).then(() => {})
      if(url[1] == "blockchain") {
        await db.set("blockchain", "[]").then(() => {})
        res.end("Reset blockchain")
      }
      res.end("Deleted")
    } else {
      res.end("Invalid key")
    }
    
  }

  else if(url[0] == "ls" || url[0] == "lsjson") {
    if(url.length == 1) {url.push("")}
    let keys = await db.list(url[1]).then((keys) => {return keys})
    let response = url[0] == "ls" ? "" : {}
    
    
    if(url[1] == "blockchain" && url[0] == "ls") {
      blockchain = JSON.parse(await db.get("blockchain").then((value) => {return value}))

      for(let elementid in blockchain) {
        element = blockchain[elementid]
        response += `${elementid}: ${element["hash"]}: \n`
        response += `....Public Key: ${element["publicKey"]}\n`
        response += `....Name: ${element["name"]}\n`
        response += `....Info: ${element["info"]}\n\n`
      }

      res.end(response)
      return;
    }


    for(let element of keys) {
      value = await db.get(element).then((value) => {
        return value
      })
      if(url[0] == "ls") {
        response += element+": "+JSON.stringify(value)+" \n"
      } else if(url[0] == "lsjson") {
        response[element] = value
      }
    }
    res.end(JSON.stringify(response))
  }


  else {
    res.end("{ 'Status': 404 }")
  }
}

const server = http.createServer(requestListener);
server.listen(8080);

