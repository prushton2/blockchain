const db = require("./database")


module.exports.createAccount = async(name, publicKey) => {
  account = {
    "publicKey": publicKey
  }
  

  await db.set(name, account)
}

module.exports.isAccount = async(name) => {
  keys = await db.list()
  return keys.indexOf(name) >= 0
}

module.exports.getUser = async(name) => {
  if(name == "blockchain") {
    return null
  }
  if(await module.exports.isAccount(name)) {
    return await db.get(name)
  } else {
    return null
  }
}

module.exports.addBlock = async(block) => {
  blockchain = await db.get("blockchain")
  blockchain = JSON.parse(blockchain)
  blockchain.push(block)
  await db.set("blockchain", JSON.stringify(blockchain))
  return true
}