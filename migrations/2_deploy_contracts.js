const MigrationOne = artifacts.require("Order");
const MigrationTwo = artifacts.require("Mediciences");
const MigrationThree = artifacts.require("Pharmacy");
const MigrationFour = artifacts.require("User_Login");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(MigrationOne, {from: accounts[0]});
    deployer.deploy(MigrationTwo, {from: accounts[0]});
    deployer.deploy(MigrationThree, {from: accounts[0]});
    deployer.deploy(MigrationFour, {from: accounts[0]});
};