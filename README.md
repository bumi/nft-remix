# NFT

## Installation


    $ npm install


## Run local node

    $ hardhat node --network hardhat

## Deploy the contract

    $ hardhat deploy --write true --network localhost

## Mint a token

    $ hardhat mint --network localhost

## For mainnet deployment

* Configure your deployer (e.g. private key) in the hardhat.config.js
* Use the same commands as above but with `--network mainnet`


## Website

* Configure the contract address
* If the contract is changed update the website/contract-metadata.js file
  * The `artifacts/contracts/Token.sol/Token.json` needs to be in the  `window.TokenMetadata` variable. (see current file for an example)
* run locally: `python -m SimpleHTTPServer`
