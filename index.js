const http = require('http');
const auth = require('./auth');
const dbm  = require('./dbmanager');
const pk   = require('./paired_keys')

const Database = require("@replit/database")
const db = new Database()


const requestListener = async(req, res) => {
  url = req.url.split("/").slice(1)
  
  if(url[0] == "newUser" && url.length == 2) {
    if(await db.get(url[1]).then((value) => {return value}) != undefined) {
      res.end("user exists")
    } else {
      let keys = auth.createKeys()
      // dbm.createAccount(url[1], { "publicKey": keys["publicKey"] })
      console.log(keys)
      res.end("Nah")
    }
  }

  else if(url[0] == "del" && url.length == 2) {
    await db.delete(url[1]).then(() => {})
    res.end("Deleted")
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
    block = {
      "name": url[1],
      "hash": auth.createHash(),
      "publicKey": undefined,
      "value": url[2]
    }

    res.end("Done")
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