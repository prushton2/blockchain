# NodeJS Blockchain
A Node.js server that uses asymmetric encryption on a blockchain.

## Setup
To run the project, upload the code to [replit.com](https://replit.com). The runtime settings are already set.

## If you are running locally (for some reason)
This project requires NodeJS and Python 2.7 or higher to run. The default database used is [replit.com](https://replit.com)'s database. This is hardcoded into the program, and I plan on making it easier to switch databases

## Using
The current encryption code is awful, and I plan on improving it. For the time being, this is how you use the program:

* /newUser/(userName)
  * Creates a new user with the given name and returns the keys. The first key is the private key, the second is the public
  * the admin user's private key is used to delete items
* /ls[json]/(searchTerm)
  * This searches the database for users or the blockchain. Leaving the search term blank returns everything
  * using /lsjson will return your search in json
* /del/(key)/(admin private key)
  * Deleted the specified key
  * if the specified key is the blockchain, it will revert to an empty list
* /newBlock/(users key pair)/(user name)/(info)
  * Creates a new block with the given info.
  
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
