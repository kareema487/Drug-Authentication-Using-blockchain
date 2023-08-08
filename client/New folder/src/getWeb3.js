import Web3 from "web3";
import Shared_Vars from './components/Helper/shared'
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "vital soul dentist check kite rebel used claim over monster excuse option";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      const provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/3214b747d84641ae88eb5de17499f67a", 5);
      const web3 = new Web3(provider);
      resolve(web3);
      Shared_Vars.web3 = web3;
      var accounts = await web3.eth.getAccounts();
      Shared_Vars.Address = accounts[0]
    });
  });

export default getWeb3;
