const Database = require("@replit/database")
const db = new Database()

module.exports.createAccount = async(name, keyPair) => {
  account = {
    "keys": JSON.stringify(keyPair)
  }
  await db.set(name, account).then (() => {})
}