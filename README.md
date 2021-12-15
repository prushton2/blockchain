# NodeJS Blockchain
A Node.js server that uses asymmetric encryption on a blockchain storage system.

## Setup
* To run the database, upload the code to [replit.com](https://replit.com). The runtime settings are already set.<br>
* To run the client app, you need to have [node.js](https://nodejs.dev/) installed<br>
* In `blockchain-client/index.js`, change the variable baseURL to the url of your node server. It is currently set to my server, which will be cleared often.

## Client side app
Use the [blockchain-client](https://github.com/prushton2/blockchain-client) app to interact with this database. This allows you to do everything with the blockchain in the most secure fashion. It includes built in encryption and decryption with [cryptojs](https://cryptojs.gitbook.io/docs/).<br>

## Using
Download [blockchain-client](https://github.com/prushton2/blockchain-client) and run it with `node index.js`. Then go to `localhost:8080` in your browser to view the app.<br>
* Create user
  * Creates a user with the given name and stores the keys on your computer
  * The keys are generated client side, meaning your private key never leaves your computer
  * The user created with the name `admin` is hardcoded as the top level account. This account can delete entries.
* Active User Name:
  * Set which user you would like to use. 
  * All your accounts are stored in `blockchain-client/keyPairs`
* Create Block
  * Creates a block with the given info as a message and the keys of the active user
* Delete
  * This requires the user to be using the admin account
  * Deletes the given key from the database. If the key is blockchain, it will reset the blockchain


## Future
This project isnt sustainable as-is, and needs a rewrite. I need to do the following:
* Rewrite index.js in the server
  * I hate looking at it. Need a better way to do it.
* Allow for modular databases
  * This involves making a file that interacts with the database that people can then edit to work with their own database
