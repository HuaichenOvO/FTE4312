# Dapp Development
A Web3 game based on reactJS + Truffle + ganache + MetaMask

FTE4312 Group project (member: 119010176; 119010068)


# Project File List

The mainly used files and directories are listed below


    Root |
         |__ client                 // front-end implemented in reactJS
              |__ config            
              |__ public
              |__ scripts
              |__ src               // store the front-end implementation
              package.json          // npm dependency

         |__ truffle                // smart contracts written in solidity
              |__ contracts         // store the .sol files
              |__ migrations        // control project migrating methods
              |__ scripts
              |__ test   
              package.json          // npm dependency
              truffle-config.json   // control the details to connect to the network
          

# How to run

Install the dependencies
    
    // under Root
    > cd client
    > npm install
    > cd ../truffle
    > npm install
    
Before you continue, make sure you have ganache locally/ goerli online/ other testnets.
As for the case of ganache, open __truffle-config.js__, find networks-development (line 38), and set the correct host and port.

Compile and migrate the contracts to your testnet. 
(Actually the author encountered a situation that the command __>truffle console__ didn't work on Windows, 
so he used a globally installed truffle instead.)
    
    // you are stil under /truffle
    > truffle console 
    truffle(development)> migrate --f 3 --to 3 // compiles all and only execute the 3rd migrating command
    
Since contract GameProfile needs to visit the data of GameSpirit, after successfully compiling, 
you need to copy the contract's instance address to the file
__/truffle/contracts/GameProfile.sol__ (line 29). For example:

    3_deploy_xxx.js
    =======================
       xxx
       > contract address:    0x65922348199C936E5a8c466512a5A5F9814bAeC2 (just an example)
       xxx
    
Then continue migrating the rest of the contracts:   
    
    truffle(development)> migrate --f 2 --to 2 // recompile all and do the first 2 migrating commands
    
Sweet! You have completed the setting of the blockchain stuff. Now go and finish the interface activation.

    truffle(development)>.exit // quit truffle console
    > cd ../client
    > npm start
    
Here, __localhost:3000__ will automatically load in the default browser, and all the demo can be viewed from the page.

# Main Functions

1. Login and connect to the metamask wallet.
2. Buy game items and feed fairies (fairy is a kind of NFT following ERC-721).
3. After your fairy has gorwn up, the account will be awarded by fairy coins.


# References:

This project cannot succeed without the help of the following blogs/documents.

https://cloud.tencent.com/developer/article/1655789

https://dzone.com/articles/lets-build-an-end-to-end-nft-project-using-truffle

https://trufflesuite.com/unleashed/

https://reactjs.org/docs/hooks-reference.html

# ————
亲爱的老师和TA，感谢您能看到这里~
