# Installation.

This is version one using web3 and truffle. Version 2 is in development. 

## Install node and pnpm

#### `install node >= 18.9.0`
#### `"corepack enable" - to enable pnpm`
#### `"pnpm i"`

## Install truffle
#### `npm install -g truffle`

## Install ganache
https://trufflesuite.com/ganache/


## Run truffle
#### `truffle console`

Connect you ganache private keys to metamask.
https://github.com/zakcroft/blockchain-tutorial/blob/main/2-Truffle%20stack.MD#truffle-console-and-ganache

Connect 2 private keys. 
The first is the owner of the app and you should migrate your contracts to ganache with this account.

The second is the user and you can buy and enter the lottery. 

The user should buy ERC20 tokens, approve tokens for usage and then enter those approved tokens into the draw.

You would need to switch to the owner abbout to pick a winner as it is only the owner of the contracts that can pick a winner.

For a full tutorial look here https://github.com/zakcroft/blockchain-tutorial


Migrate your contracts

#### `truffle migrate`


Got to http://localhost:3000/home


This APP is an example of using an ERC20 toekn.


Uses web3 and truffle