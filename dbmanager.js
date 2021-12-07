const Database = require("@replit/database")
const db = new Database()

module.exports.createAccount = async(name, keyPair) => {
  account = {
    "publicKey": JSON.stringify(keyPair)
  }
  await db.set(name, account).then(() => {})
}

module.exports.isAccount = async(name) => {
  keys = await db.list().then((keys) => { return keys; })
  return keys.indexOf(name) >= 0
}

module.exports.getUser = async(name) => {
  if(name == "blockchain") {
    return null
  }
  if(await module.exports.isAccount(name)) {
    return await db.get(name).then((value) => {return value;})
  } else {
    return null
  }
}