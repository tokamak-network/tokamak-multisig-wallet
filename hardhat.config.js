require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// console.log(process.env.ETH_NODE_URI_MAINNET)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    forking: {
      url: `${process.env.ETH_NODE_URI_MAINNET}`,
      blockNumber: 21077756
    },
  }
};
