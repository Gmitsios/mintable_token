const path = require("path");
require("dotenv").config({path: ".env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountNum = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountNum)
      },
      network_id: 5777
    },
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/API_ID", AccountNum)
      },
      network_id: 4
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
