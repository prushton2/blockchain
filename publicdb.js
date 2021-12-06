const Database = require("@replit/database")
const response = require("./response")


module.exports.run = async(req, url) => {
  const db = new Database()

  output = response.createEmpty()


  if(url[1] == "set") {
    await db.set(url[2], url[3]).then(() => {
      output["Response"] = {
        "command": "set",
        "key": url[2],
        "value": url[3]
      }
      output["Status"] = 200
    })

  } else if(url[1] == "get") {
    await db.get(url[2]).then((value) => {
      output["Response"] = {
        "command": "get",
        "key": url[2],
        "value": value,
      }
      output["Status"] = 200
    })

  } else if(url[1] == "del") {
    await db.delete(url[2]).then(() =>  {
      output["Response"] = {
        "command": "del",
        "key": url[2],
        "value": undefined
      }
      output["Status"] = 200
    })

  } else if(url[1] == "ls") {
    await db.list().then((value) =>  {
      output["Response"] = {
        "command": "ls",
        "key": value,
        "value": undefined
      }
      output["Status"] = 200
    })

  } else {
    output["Status"] = 404
  }

  return output

}