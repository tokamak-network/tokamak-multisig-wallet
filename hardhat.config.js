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
    mainnet: {
      url: `${process.env.ETH_NODE_URI_MAINNET}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gasPrice: 50000000000,
    },
    sepolia: {
      url: `${process.env.ETH_NODE_URI_sepolia}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};
