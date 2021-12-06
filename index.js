const http = require('http');
const auth = require('./auth');
const dbm = require('./dbmanager');
const Database = require("@replit/database")
const db = new Database()


const requestListener = async(req, res) => {
  url = req.url.split("/").slice(1)

  if(url[0] == "newUser" && url.length >= 2) {
    if(db.get(url[1]).then((value) => {return value}) != undefined) {
      res.end("user exists")
    }
    let keys = auth.createKeys()
    dbm.createAccount(url[1], keys)
    res.end(JSON.stringify(keys))
  }

  if(url[0] == "del" && url.length >= 2) {
    await db.delete(url[1]).then(() => {})
  }

  if(url[0] == "db") {
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


  res.end("{ 'Status': 404 }")
}

const server = http.createServer(requestListener);
server.listen(8080);