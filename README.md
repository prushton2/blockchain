# NodeJS Blockchain
A Node.js server that uses asymmetric encryption on a blockchain.

## Setup
To run the project, upload the code to [replit.com](https://replit.com). The runtime settings are already set.

## If you are running locally (for some reason)
This project requires NodeJS and Python 2.7 or higher to run. The default database used is [replit.com](https://replit.com)'s database. This is hardcoded into the program, and I plan on making it easier to switch databases

## Client side app
use [blockchain-client](https://github.com/prushton2/blockchain-client) to interact with this database. This allows you to create accounts and blocks in the bockchain. It includes built in encryption and decryption.<br>
in `index.js`, change the variable baseURL to the url of your node server

## Using
Download [blockchain-client](https://github.com/prushton2/blockchain-client) and run it with `node index.js`<br>
* Create user
  * Creates a user with the given name and stores the keys on your computer
  * The keys are generated client side, meaning your private key never leaves your computer
* Active User Name:
  * Set which user you would like to use. 
  * All your accounts are stored in the keyPairs directory inside the project
* Create Block
  * Creates a block with the given info and the keys of the active user

## Future
This project isnt sustainable as-is, and needs a rewrite. I need to do the following:
* Create a client side application to host the private key
  * This will prevent the need of passing it over the internet
* Allow for modular databases
  * This involves making a file that interacts with the database that people can then edit to work with their own database
* New encryption
  * The current encryption code is from 2013 and can be brute forced by a human with a moderate amount of patience.
  * I plan on using cryptoJS for the encryption
    * This will eliminate the need for python on the node server
