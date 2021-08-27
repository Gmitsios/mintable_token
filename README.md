# mintable_token
The **LOTTO Token** is an ERC-20 developed in Solidity with truffle and React. 
It was developed to be used as a native currency for the [Blockchain Casino](https://github.com/Gmitsios/blockchain-casino) which later led to [Blockchain Casino with ERC20 Token](https://github.com/Gmitsios/blockchain-casino-erc20) project.

![](https://github.com/Gmitsios/mintable_token/blob/main/screenshot.png)

### Dependencies:

- install [nodejs](https://nodejs.org/en/) with/and npm
-  `npm i -g truffle`
- install [ganache](https://www.trufflesuite.com/ganache)

Replace the '**MNEMONIC**' in `env.example` and rename it to `.env`

For **Metamask**:
- Add the [extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Generate accounts with the same '**MNEMONIC**'
- Add a new network and connect it to Ganache (port: 7545)

## Migrate on Blockchain:
    
    npm install
    truffle migrate --network ganache_local

### To Test the Migration

    truffle test --network ganache_local

## Run the Front-End React App:

    cd client
    npm install
    npm run start
   