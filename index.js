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
      let keys = await pk.run("make_keys()")

      let value = JSON.parse(keys.replace(/\(/g, "[").replace(/\)/g, "]"))

      publicKey = value[1]
      privateKey = value[0]

      dbm.createAccount(url[1], publicKey)

      res.end(JSON.stringify(value))


    }
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

  else if(url[0] == 'newBlock' && url.length == 4) {

    privateKey = JSON.parse(url[1])[0]
    publicKey = JSON.parse(url[1])[1]
    name = url[2]
    info = url[3]
    hash = pk.createHash()
    accountInfo = await dbm.getUser(name)

    if(JSON.stringify(accountInfo["publicKey"]) != JSON.stringify(publicKey)) {
      res.end("Invalid Public Key")
      return;
    }
    
    
    block = {
      "publicKey": publicKey,
      "hash": hash,
      "name": name,
      "info": info,
    }


    if(!(await pk.validateKeys(privateKey, publicKey))) {
      res.end("Keys Dont Match")
    } else {

      result = dbm.addBlock(block)
      if(result) {
        res.end("Added block")
      } else {
        res.end("Keys dont match, block not added")
      }
    }

  }

  else {
    res.end("{ 'Status': 404 }")
  }
}

const server = http.createServer(requestListener);
server.listen(8080);