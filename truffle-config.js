const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "vital soul dentist check kite rebel used claim over monster excuse option";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    }, ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "wss://ropsten.infura.io/ws/v3/3214b747d84641ae88eb5de17499f67a", 5);
      },
      // from: "0x5Ac03fb1d61A3388E2b3Cf99F1219c641747A8FF",
      websockets: true,
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};
