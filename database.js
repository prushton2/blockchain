const Database = require("@replit/database")
const db = new Database()

module.exports.set = async(key, value) => {
  await db.set(key, value)
  return true
}

module.exports.get = async(key) => {
  return await db.get(key).then((value) => {return value})
}

module.exports.delete = async(key) => {
  await db.delete(key)
  return true
}

module.exports.list = async(search) => {
  return await db.list(search).then((keys) => {return keys})
}