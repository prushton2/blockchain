const http = require('http');
const dbm  = require('./dbmanager');
const pk   = require('./paired_keys')

const Database = require("@replit/database")
const db = new Database()


const requestListener = async(req, res) => {
  url = req.url.split("/").slice(1)
  
  if(url[0] == "newUser" && url.length == 2) {
    
    if(await db.get(url[1]).then((value) => {return value}) != undefined) { // Cancel if user exists
      res.end("user exists")
    } else {
      let keys = pk.run("make_keys()", (keys) => {

        let value = JSON.parse(keys.replace(/\(/g, "[").replace(/\)/g, "]"))

        publicKey = value[1]
        privateKey = value[0]

        dbm.createAccount(url[1], publicKey)

        res.end(JSON.stringify(value))
      })

    }
  }


  else if(url[0] == "del" && url.length == 2) {
    await db.delete(url[1]).then(() => {})
    res.end("Deleted")
  }

  else if(url[0] == "resetBC") {
    await db.set("blockchain", "[]").then( () => {
      res.end("set")
    })
  }


  else if(url[0] == "db") {
    let keys = await db.list().then((keys) => {return keys})
    let response = ""
    for(let element of keys) {
      value = await db.get(element).then((value) => {
        return value
      })
      response += element+": "+JSON.stringify(value)+" \n"
    }
    res.end(response)
  }


  else if(url[0] == 'newBlock' && url.length == 4) {

    privateKey = JSON.parse(url[1])[0]
    publicKey = JSON.parse(url[1])[1]
    name = url[2]
    info = url[3]
    hash = pk.createHash()
    accountInfo = await dbm.getUser(name)

    if(JSON.stringify(accountInfo["publicKey"]) != JSON.stringify(publicKey)) {
      res.end("Invalid Public Key")
    }
    
    
    block = {
      "publicKey": publicKey,
      "hash": hash,
      "name": name,
      "info": info,
    }



    pk.run("encrypt("+publicKey[0]+","+publicKey[1]+",'"+hash+"')", (encrypted) => {
      pk.run("decrypt("+privateKey[0]+","+privateKey[1]+",'"+encrypted+"')", (value) => {
        if(value != hash) {
          res.end("Keys Dont Match")
        } else {

          result = dbm.addBlock(block)
          if(result) {
            res.end("Added block")
          } else {
            res.end("Keys Match, block not added")
          }
        }
      })
    })
  }

   

  else if(url[0] == "dbg") {
    var output = ""
    await pk.run("number_to_letter(28)", (value) => {
      output = value
      console.log(output)
      res.end(output)
    })

  }
  
  else {
    res.end("{ 'Status': 404 }")
  }
}

const server = http.createServer(requestListener);
server.listen(8080);