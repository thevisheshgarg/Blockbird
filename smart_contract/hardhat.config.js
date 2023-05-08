require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.2',
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545"
    },
    // sepolia: {
    //   url: config.url,
    //   accounts: [
    //     config.privateKey1,
    //   ],
    },
  }

